import faker from 'faker';

import { Hasher } from '@/application/protocols';

export class HasherSpy implements Hasher {
  plaintext: string;
  digest = faker.random.alphaNumeric();

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;

    return this.digest;
  }
}
