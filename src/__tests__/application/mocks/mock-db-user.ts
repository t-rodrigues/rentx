import { DbCreateUserParams, DbUser } from '@/application/dtos';
import {
  CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
} from '@/application/protocols';

import { mockUser } from '@/__tests__/domain/mocks';

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string;
  result = mockUser();

  async loadByEmail(email: string): Promise<DbUser> {
    this.email = email;

    return this.result;
  }
}

export class CreateUserRepositorySpy implements CreateUserRepository {
  params: DbCreateUserParams;
  result = mockUser();

  async create(data: DbCreateUserParams): Promise<void> {
    this.params = data;
  }
}

export class LoadUserByIdRepositorySpy implements LoadUserByIdRepository {
  id: string;
  result = mockUser();

  async loadById(id: string): Promise<DbUser> {
    this.id = id;

    return this.result;
  }
}
