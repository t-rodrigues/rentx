import { Router } from 'express';

import { expressRoutesAdapter } from '@/main/adapters';
import { makeAuthenticationController } from '@/main/factories';

const authenticationRouter = Router();

authenticationRouter.post(
  '/sessions',
  expressRoutesAdapter(makeAuthenticationController()),
);

export { authenticationRouter };
