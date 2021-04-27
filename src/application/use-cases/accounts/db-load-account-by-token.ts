import { Decrypter, LoadUserByIdRepository } from '@/application/protocols';
import { UserEntity } from '@/domain/entities';
import { LoadAccountByToken } from '@/domain/use-cases';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async load(accessToken: string): Promise<UserEntity> {
    const userId = await this.decrypter.decrypt(accessToken);

    if (userId) {
      const user = await this.loadUserByIdRepository.loadById(userId);

      if (user) {
        return user;
      }
    }

    return null;
  }
}
