import {
  CreateUserRepository,
  Hasher,
  LoadUserByEmailRepository,
} from '@/application/protocols';
import { UserEntity } from '@/domain/entities';

import { CreateUser, CreateUserParams } from '@/domain/use-cases';

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async create(userData: CreateUserParams): Promise<UserEntity> {
    const { name, email, password, driverLicense } = userData;

    const emailAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(
      email,
    );

    if (emailAlreadyExists) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(password);

    return this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      driverLicense,
    });
  }
}
