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
    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (!user) {
      return new AcessDeniedError();
    }

    return null;
  }
}
