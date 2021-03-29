import { Express } from 'express';

import { categoriesRoutes } from '@/main/routes';

export const setupRoutes = (app: Express) => {
  app.use('/categories', categoriesRoutes);
};
