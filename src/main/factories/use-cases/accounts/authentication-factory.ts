import { DbAuthentication } from '@/application/use-cases';
import { BCryptAdapter, JwtAdapter } from '@/infra/cryptography';
import { AccountsPostgresRepository } from '@/infra/db/typeorm/repositories';

export const makeDbAuthentication = (): DbAuthentication => {
  const accountsPostgresRepository = new AccountsPostgresRepository();
  const bcryptAdapter = new BCryptAdapter();
  const jwtAdapter = new JwtAdapter();

  return new DbAuthentication(
    accountsPostgresRepository,
    bcryptAdapter,
    jwtAdapter,
  );
};
