import { Controller } from '@/shared/protocols';
import { ListCategoriesController } from '@/modules/cars/presentation/controllers';

import { makeDbListCategories } from '../use-cases';

export const makeListCategoriesController = (): Controller => {
  return new ListCategoriesController(makeDbListCategories());
};
