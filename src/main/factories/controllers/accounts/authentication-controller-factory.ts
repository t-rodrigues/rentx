import { makeDbAuthentication } from '@/main/factories/use-cases';
import { AuthenticationController } from '@/presentation/controllers';
import { Controller } from '@/shared/protocols';

export const makeAuthenticationController = (): Controller => {
  return new AuthenticationController(makeDbAuthentication());
};
