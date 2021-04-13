import { DbCreateUser } from '@/application/use-cases';
import { CreateUser } from '@/domain/use-cases';
import { BCryptAdapter } from '@/infra/cryptography';
import { AccountsPostgresRepository } from '@/infra/db/typeorm/repositories';

export const makeDbCreateUser = (): CreateUser => {
  const accountsPostgresRepository = new AccountsPostgresRepository();
  const salt = 8;
  const bcryptAdapter = new BCryptAdapter(salt);

  return new DbCreateUser(
    accountsPostgresRepository,
    bcryptAdapter,
    accountsPostgresRepository,
  );
};
