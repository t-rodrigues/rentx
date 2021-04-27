import { mockAuth, mockUser } from '@/__tests__/domain/mocks';
import {
  Auth,
  Authentication,
  AuthParams,
  CreateUser,
  CreateUserParams,
} from '@/domain/use-cases';
import { UserEntity } from '@/domain/entities';

export class AuthenticationSpy implements Authentication {
  params: AuthParams;
  result = mockAuth();

  async auth(authParams: AuthParams): Promise<Auth> {
    this.params = authParams;

    return this.result;
  }
}

export class CreateUserSpy implements CreateUser {
  params: CreateUserParams;
  result = mockUser();

  async create(data: CreateUserParams): Promise<UserEntity> {
    this.params = data;

    return this.result;
  }
}
