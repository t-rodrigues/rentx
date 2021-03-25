export type HttpRequest = {
  headers?: any;
  body?: any;
  params?: any;
  files?: any;
};

export type HttpResponse = {
  statusCode: number;
  body?: any;
};
