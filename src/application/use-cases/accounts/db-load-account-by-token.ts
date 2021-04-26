import { Decrypter } from '@/application/protocols';
import { LoadAccountByToken } from '@/domain/use-cases';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(token: string): Promise<void> {
    await this.decrypter.decrypt(token);

    return null;
  }
}
