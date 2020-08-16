import { getService, juggler } from '@loopback/service-proxy';
import { Provider } from '@loopback/core';
import { StorageDataSource } from '../datasources/storage.datasource';
import { IStorageService } from '../interfaces';


export class StorageServiceProvider implements Provider<IStorageService> {
  constructor(
    protected dataSource: juggler.DataSource = new StorageDataSource()
  ) { }

  value(): Promise<IStorageService> {
    return getService(this.dataSource);
  }
}
