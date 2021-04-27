import { AuthMiddleware } from '@/presentation/middlewares';
import { Middleware } from '@/shared/protocols';
import { makeDbLoadAccountByToken } from '@/main/factories/use-cases';

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
