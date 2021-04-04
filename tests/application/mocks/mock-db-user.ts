import { DbUser } from '@/application/dtos';

import { LoadUserByEmailRepository } from '@/application/protocols';
import { mockUser } from '@/tests/domain/mocks';

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string;
  result = mockUser();

  async loadByEmail(email: string): Promise<DbUser> {
    this.email = email;

    return this.result;
  }
}
