import { Request, Response } from 'express';

import { Controller } from '@/shared/protocols';

export const expressRoutesAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      ...(request.body || {}),
      ...(request.params || {}),
    };

    const { statusCode, body } = await controller.handle(httpRequest);

    if (statusCode >= 200 && statusCode <= 299) {
      response.status(statusCode).json(body);
    } else {
      response.status(statusCode).json({ error: body.message });
    }
  };
};
