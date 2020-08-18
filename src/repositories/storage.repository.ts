import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {File, FileRelations} from '../models';
import { promisify } from 'util';
import { serviceProxy } from '@loopback/service-proxy';
import { IStorageService } from '../interfaces';

let container:string = '';

const {
  STORAGE_PROVIDER,
  STORAGE_GOOGLE_BUCKET,
  STORAGE_LOCAL_CONTAINER,
} = process.env;

switch (STORAGE_PROVIDER) {
  case 'local':
    container = STORAGE_LOCAL_CONTAINER || 'files';
  break;
  case 'google':
    container = STORAGE_GOOGLE_BUCKET || 'files';
  break;
  default:
    container = 'files'
  break;
} 

export class StorageRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {
  @serviceProxy('Storage')
  private storageService: IStorageService;

  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(File, dataSource);
  }

  async upload(request: any, response: any): Promise<File> {
    const upload = promisify(this.storageService.upload);
    const uploaded = await upload(container, request, response, {});
    const file = await this.create({
      name: uploaded.files.file[0].name,
      type: uploaded.files.file[0].type,
      publicKey: await this.generateUniqueKey('publicKey', 32),
      privateKey: await this.generateUniqueKey('privateKey', 32),
    });
    return file;
  }

  async download(publicKey: string, request: any, response: any): Promise<any> {
    const file = await this.findOne({ where: { publicKey }});
    const fileName = file && file.name ? file.name : publicKey;
    const download = promisify(this.storageService.download);
    return await download(container, fileName, request, response);
  }

  async removeFile(privateKey: string, request: any, response: any): Promise<boolean> {
    const file = await this.findOne({ where: { privateKey }});
    const fileName = file && file.name ? file.name : privateKey;
    await this.deleteAll({ privateKey });
    const removeFile = promisify(this.storageService.removeFile);
    return await removeFile(container, fileName);
  }

  async generateUniqueKey(field: string, length: number): Promise<string> {
    let uniqueKey = this.makeUniqueKey(length);
    while ((await this.count({ [field]: uniqueKey })).count !== 0) uniqueKey = this.makeUniqueKey(length);
    return uniqueKey;
  }

  makeUniqueKey(length: number): string {
    let result = '';
    const characters = 'abcdef0123456789';
    while (result.length < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
