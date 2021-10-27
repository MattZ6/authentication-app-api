/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHttpRespose<B = any> {
  statusCode: number;
  body?: B;
}

export interface IHttpRequest<B = any> {
  user_id: string;
  body?: B;
}
