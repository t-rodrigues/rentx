import { ListSpecificationsController } from '@/presentation/controllers';
import { Controller } from '@/shared/protocols';

import { makeDbListSpecifications } from '@/main/factories/use-cases';

export const makeListSpecificationsController = (): Controller => {
  return new ListSpecificationsController(makeDbListSpecifications());
};
