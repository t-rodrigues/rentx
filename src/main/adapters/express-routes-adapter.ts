import { Request, Response } from 'express';

import { Controller, HttpRequest } from '@/shared/protocols';

export const expressRoutesAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      headers: request.headers || {},
      params: request.params || {},
      body: request.body || {},
      files: request.files || {},
    };

    const { statusCode, body } = await controller.handle(httpRequest);

    if (statusCode >= 200 && statusCode <= 299) {
      response.status(statusCode).json(body);
    } else {
      response.status(statusCode).json({ error: body.message });
    }
  };
};
