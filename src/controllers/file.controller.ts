import {Request, Response, RestBindings, get, post, del, param, requestBody, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/core';

/**
 * OpenAPI response for file()
 */
const FILE_RESPONSE: ResponseObject = {
  description: 'File Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'FileResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'}
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class FileController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
  // Map to `GET /file`
  @post('/file', {
   responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: '',
      },
    }
  })
  async upload(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: {type: 'object'},
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
		console.log(request)
    return new Promise<object>((resolve, reject) => {
      resolve({
				publicKey: 'test',
				privateKey: 'test'
			});
    });
  }

  // Map to `GET /file`
  @get('/file/{publicKey}', {
    responses: {
      '200': FILE_RESPONSE,
    },
  })
  fetch(
    @param.path.string('publicKey') publicKey: string
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'GET',
      publicKey,
      date: new Date(),
      url: this.req.url
    };
  }

  // Map to `DELETE /file`
  @del('/file/{privateKey}', {
    responses: {
      '200': FILE_RESPONSE
    }
  })
  destroy(
    @param.path.string('privateKey') privateKey: string
  ): object {
    return {
      greeting: 'DELETE',
      privateKey,
      date: new Date(),
      url: this.req.url
    }
  }
}
