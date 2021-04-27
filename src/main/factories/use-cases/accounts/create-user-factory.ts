import { DbCreateUser } from '@/application/use-cases';
import { CreateUser } from '@/domain/use-cases';
import { BCryptAdapter } from '@/infra/cryptography';
import { AccountsPostgresRepository } from '@/infra/db/typeorm/repositories';

export const makeDbCreateUser = (): CreateUser => {
  const accountsPostgresRepository = new AccountsPostgresRepository();
  const bcryptAdapter = new BCryptAdapter();

  return new DbCreateUser(
    accountsPostgresRepository,
    bcryptAdapter,
    accountsPostgresRepository,
  );
};
