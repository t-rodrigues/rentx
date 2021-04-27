import { sign, verify } from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@/application/protocols';
import { env } from '@/main/config/env';

export type TokenReturn = {
  userId: string;
};
export class JwtAdapter implements Encrypter, Decrypter {
  async encrypt(plaintext: string): Promise<string> {
    return sign({ userId: plaintext }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    });
  }

  async decrypt(ciphertext: string): Promise<string> {
    try {
      const { userId } = verify(ciphertext, env.jwt.secret) as TokenReturn;

      return userId;
    } catch {
      return null;
    }
  }
}
