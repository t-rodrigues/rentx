import { hash } from 'bcrypt';

import { Hasher } from '@/application/protocols';

export class BCryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return hash(plaintext, this.salt);
  }
}
