import { Controller } from '@/shared/protocols';
import { AddCategoryController } from '@/presentation/controllers';

import { makeDbAddCategory } from '@/main/factories/use-cases';

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeDbAddCategory());
};
