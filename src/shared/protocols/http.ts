export type HttpRequest<T = any> = T;

export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
};
