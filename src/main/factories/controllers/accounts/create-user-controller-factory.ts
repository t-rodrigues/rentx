import { CreateUserController } from '@/presentation/controllers';
import { Controller } from '@/shared/protocols';
import { makeDbCreateUser } from '../../use-cases';

export const makeCreateUserController = (): Controller => {
  return new CreateUserController(makeDbCreateUser());
};
