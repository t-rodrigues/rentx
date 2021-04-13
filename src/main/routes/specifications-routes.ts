import { Router } from 'express';
import { expressRoutesAdapter } from '../adapters';
import { makeAddSpecificationController } from '../factories/controllers/cars/add-specification-controller-factory';
import { makeListSpecificationsController } from '../factories/controllers/cars/list-specifications-controller-factory';

const specificationsRouter = Router();

specificationsRouter.post(
  '/',
  expressRoutesAdapter(makeAddSpecificationController()),
);

specificationsRouter.get(
  '/',
  expressRoutesAdapter(makeListSpecificationsController()),
);

export { specificationsRouter };
