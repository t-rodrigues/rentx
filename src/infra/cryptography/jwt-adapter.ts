import { sign } from 'jsonwebtoken';

import { Encrypter } from '@/application/protocols';

export class JwtAdapter implements Encrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}

  async encrypt(plaintext: string): Promise<string> {
    return sign({ user_id: plaintext }, this.secret, {
      expiresIn: this.expiresIn,
    });
  }
}
