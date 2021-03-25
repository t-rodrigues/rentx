import { Express } from 'express';

import { categoriesRoutes } from '../routes';

export const setupRoutes = (app: Express) => {
  app.use('/categories', categoriesRoutes);
};
