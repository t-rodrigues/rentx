import {
  CreateUserRepository,
  Hasher,
  LoadUserByEmailRepository,
} from '@/application/protocols';
import { CreateUser, CreateUserParams } from '@/domain/use-cases';

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async create(userData: CreateUserParams): Promise<void> {
    const { name, email, password, driverLicense } = userData;

    const emailAlreadyExists = await this.loadUserByEmailRepository.loadByEmail(
      email,
    );

    if (emailAlreadyExists) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(password);

    await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
      driverLicense,
    });
  }
}
