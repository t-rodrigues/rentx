import { LoadUserByEmailRepository } from '@/application/protocols';
import { AcessDeniedError } from '@/domain/errors';
import { Authentication, AuthParams } from '@/domain/use-cases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async auth({
    email,
    password,
  }: AuthParams): Promise<string | AcessDeniedError> {
    await this.loadUserByEmailRepository.loadByEmail(email);
    return null;
  }
}
