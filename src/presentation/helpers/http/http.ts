import { IHttpRespose } from '../../protocols/Http';

export function ok<T = any>(data: T): IHttpRespose<T> {
  return {
    statusCode: 200,
    body: data,
  };
}

export function created<T = any>(data?: T): IHttpRespose<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

export function notFound(error: Error): IHttpRespose<Error> {
  return {
    statusCode: 404,
    body: error,
  };
}

export function unprocessableEntity(error: Error): IHttpRespose<Error> {
  return {
    statusCode: 422,
    body: error,
  };
}

export function internalServerError(error: Error): IHttpRespose<Error> {
  return {
    statusCode: 500,
    body: error,
  };
}
