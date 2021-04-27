import {
  Encrypter,
  HashComparer,
  LoadUserByEmailRepository,
} from '@/application/protocols';
import { Auth, Authentication, AuthParams } from '@/domain/use-cases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth({ email, password }: AuthParams): Promise<Auth> {
    const user = await this.loadUserByEmailRepository.loadByEmail(email);

    if (user) {
      const passwordMatchs = await this.hashComparer.compare(
        password,
        user.password,
      );

      if (passwordMatchs) {
        const accessToken = await this.encrypter.encrypt(user.id);

        return {
          accessToken,
          user: {
            name: user.name,
            email: user.email,
          },
        };
      }
    }

    return null;
  }
}
