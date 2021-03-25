import { Controller } from '@/shared/protocols';
import { AddCategoryController } from '@/modules/cars/presentation/controllers';

import { makeDbAddCategory } from '../use-cases';

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeDbAddCategory());
};
