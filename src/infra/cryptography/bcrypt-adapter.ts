import { compare, hash } from 'bcrypt';

import { HashComparer, Hasher } from '@/application/protocols';

export class BCryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
