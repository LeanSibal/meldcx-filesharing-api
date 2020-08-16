import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const {
  STORAGE_PROVIDER,
  STORAGE_GOOGLE_PROJECTID,
  STORAGE_GOOGLE_BUCKET,
  STORAGE_GOOGLE_CONFIG_PATH,
  STORAGE_LOCAL_FOLDER,
  STORAGE_LOCAL_CONTAINER
} = process.env;

let config = {
  name: 'Storage',
  connector: 'loopback-component-storage',
  nameConflict: 'makeUnique'
};

const defaults = {
  provider: 'filesystem',
  root: './uploads',
  nameConflict: 'makeUnique'
};

switch (STORAGE_PROVIDER) {
  case 'local':
    Object.assign(config, {
      provider: 'filesystem',
      root: STORAGE_LOCAL_FOLDER ? STORAGE_LOCAL_FOLDER : './uploads',
    });
  break;

  case 'google':
    Object.assign(config, {
      provider: 'google',
      keyFilename: STORAGE_GOOGLE_CONFIG_PATH,
      projectId: STORAGE_GOOGLE_PROJECTID,
    });
  break;

  default:
    Object.assign(config, defaults);
  break;
}

/*
const config = {
  "name": "Storage",
  "connector": "loopback-component-storage",
  "provider": "google",
  "keyFilename": "google-cloud.json",
  "projectId": "projects-235714",
  "nameConflict": "makeUnique"
};
const config = {
  "name": "Storage",
  "connector": "loopback-component-storage",
  "provider": "filesystem",
  "root": "./uploads",
  "nameConflict": "makeUnique"
};
*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class StorageDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Storage';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Storage', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
