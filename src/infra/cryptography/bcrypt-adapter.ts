import { compare, hash } from 'bcrypt';

import { HashComparer, Hasher } from '@/application/protocols';

import { env } from '@/main/config/env';

export class BCryptAdapter implements Hasher, HashComparer {
  constructor() {}

  async hash(plaintext: string): Promise<string> {
    return hash(plaintext, env.bcrypt.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
