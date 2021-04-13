import { Router } from 'express';

import { expressRoutesAdapter } from '@/main/adapters';
import { makeCreateUserController } from '@/main/factories';

const usersRouter = Router();

usersRouter.post('/', expressRoutesAdapter(makeCreateUserController()));

export { usersRouter };
