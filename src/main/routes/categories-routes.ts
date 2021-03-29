import { Router } from 'express';

import { expressRoutesAdapter } from '@/main/adapters';
import {
  makeAddCategoryController,
  makeListCategoriesController,
} from '@/main/factories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', expressRoutesAdapter(makeAddCategoryController()));
categoriesRoutes.get('/', expressRoutesAdapter(makeListCategoriesController()));

export { categoriesRoutes };
