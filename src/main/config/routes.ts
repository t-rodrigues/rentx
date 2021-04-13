import { Express } from 'express';

import {
  categoriesRoutes,
  specificationsRouter,
  usersRouter,
} from '@/main/routes';

export const setupRoutes = (app: Express) => {
  app.use('/categories', categoriesRoutes);
  app.use('/specifications', specificationsRouter);
  app.use('/users', usersRouter);
};
