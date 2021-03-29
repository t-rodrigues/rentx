import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

import { swaggerConfig } from '@/main/docs';

export const setupSwagger = (app: Router) => {
  app.use('/docs', serve, setup(swaggerConfig));
};
