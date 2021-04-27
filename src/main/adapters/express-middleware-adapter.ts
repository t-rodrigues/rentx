import { NextFunction, Request, Response } from 'express';

import { Middleware } from '@/shared/protocols';

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest = {
      accessToken: request.headers.authorization,
    };

    const httpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body);

      return next();
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
