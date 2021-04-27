import { Router } from 'express';

import {
  expressMiddlewareAdapter,
  expressRoutesAdapter,
} from '@/main/adapters';
import {
  makeAddCategoryController,
  makeAuthMiddleware,
  makeListCategoriesController,
} from '@/main/factories';

const categoriesRoutes = Router();

categoriesRoutes.use(expressMiddlewareAdapter(makeAuthMiddleware()));
categoriesRoutes.get('/', expressRoutesAdapter(makeListCategoriesController()));
categoriesRoutes.post('/', expressRoutesAdapter(makeAddCategoryController()));

export { categoriesRoutes };
