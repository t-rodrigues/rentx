import { Router } from 'express';

import { expressRoutesAdapter } from '@/shared/adapters';
import {
  makeAddCategoryController,
  makeListCategoriesController,
} from '@/main/factories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', expressRoutesAdapter(makeAddCategoryController()));
categoriesRoutes.get('/', expressRoutesAdapter(makeListCategoriesController()));

export { categoriesRoutes };
