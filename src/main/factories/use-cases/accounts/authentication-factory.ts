import { DbAuthentication } from '@/application/use-cases';
import { BCryptAdapter, JwtAdapter } from '@/infra/cryptography';
import { AccountsPostgresRepository } from '@/infra/db/typeorm/repositories';

import { env } from '@/main/config/env';

export const makeDbAuthentication = (): DbAuthentication => {
  const accountsPostgresRepository = new AccountsPostgresRepository();
  const bcryptAdapter = new BCryptAdapter(env.bcrypt.salt as number);
  const jwtAdapter = new JwtAdapter(env.jwt.secret, env.jwt.expiresIn);

  return new DbAuthentication(
    accountsPostgresRepository,
    bcryptAdapter,
    jwtAdapter,
  );
};
