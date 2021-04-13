import { Controller } from '@/shared/protocols';
import { AddSpecificationController } from '@/presentation/controllers';

import { makeDbAddSpecification } from '@/main/factories/use-cases';

export const makeAddSpecificationController = (): Controller => {
  return new AddSpecificationController(makeDbAddSpecification());
};
