import { DbLoadAccountByToken } from '@/application/use-cases';
import { JwtAdapter } from '@/infra/cryptography';
import { AccountsPostgresRepository } from '@/infra/db/typeorm/repositories';

export const makeDbLoadAccountByToken = (): DbLoadAccountByToken => {
  const jwtAdapter = new JwtAdapter();
  const accountsPostgresRepository = new AccountsPostgresRepository();

  return new DbLoadAccountByToken(jwtAdapter, accountsPostgresRepository);
};
