import faker from 'faker';

import { Encrypter, HashComparer, Hasher } from '@/application/protocols';

export class HasherSpy implements Hasher {
  plaintext: string;
  digest = faker.random.alphaNumeric();

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;

    return this.digest;
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string;
  digest: string;
  result = true;

  async compare(plaintext: string, digest: string) {
    this.plaintext = plaintext;
    this.digest = digest;

    return this.result;
  }
}

export class EncrypterSpy implements Encrypter {
  plaintext: string;
  result = faker.datatype.uuid();
  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;

    return this.result;
  }
}
