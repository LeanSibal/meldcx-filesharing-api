import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class File extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  privateKey?: string;

  @property({
    type: 'string',
    required: true,
  })
  publicKey: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<File>) {
    super(data);
  }
}

export interface FileRelations {
  // describe navigational properties here
}

export type FileWithRelations = File & FileRelations;
