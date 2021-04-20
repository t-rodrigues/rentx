import {
  Encrypter,
  HashComparer,
  LoadUserByEmailRepository,
} from '@/application/protocols';
import { AcessDeniedError } from '@/domain/errors';
import { Authentication, AuthParams } from '@/domain/use-cases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth({
    email,
    password,
  }: AuthParams): Promise<string | AcessDeniedError> {
    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (!user) {
      return new AcessDeniedError();
    }

    const passwordMatchs = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!passwordMatchs) {
      return new AcessDeniedError();
    }

    await this.encrypter.encrypt(user.id);

    return null;
  }
}
