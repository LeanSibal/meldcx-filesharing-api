import {Request, Response, RestBindings, get, post, del, param, requestBody, ResponseObject} from '@loopback/rest';
import { repository } from '@loopback/repository';
import {inject} from '@loopback/core';
import { Container, File } from '../models';
import { StorageRepository } from '../repositories';

export class FileController {

  constructor(
    @inject(RestBindings.Http.REQUEST) public request: Request,
    @inject(RestBindings.Http.RESPONSE) public response: Response,
    @repository(StorageRepository) public storageRepository: StorageRepository,
  ) { }

  @post('/file', {
    responses: {
      '200': {
        description: 'File uploaded.',
        content: { 'application/json': { schema: { 'x-ts-type': File } } },
      },
    },
  })
  async upload(
    @requestBody.file() request: Request, 
  ): Promise<File> {
    return await this.storageRepository.upload(this.request, this.response);
  } 

  @get('/file/{publicKey}', {
    responses: {
      '200': {
        description: 'File downloaded.',
        content: { 'application/json': { schema: { 'x-ts-type': Object } } },
      },
    },
  })
  async download(
    @param.path.string('publicKey') publicKey: string
  ): Promise<any> {
    return await this.storageRepository.download(publicKey, this.request, this.response);
  }

  @del('/file/{privateKey}', {
    responses: {
      '204': {
        description: 'File deleted.',
      },
    },
  })
  async destroy(
    @param.path.string('privateKey') privateKey: string
  ): Promise<boolean> {
    return await this.storageRepository.removeFile(privateKey, this.request, this.response);
  }
}
