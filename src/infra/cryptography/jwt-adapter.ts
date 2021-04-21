import { sign } from 'jsonwebtoken';

import { Encrypter } from '@/application/protocols';

export class JwtAdapter implements Encrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}

  async encrypt(plaintext: string): Promise<string> {
    sign({ id: plaintext }, this.secret, { expiresIn: this.expiresIn });

    return null;
  }
}
