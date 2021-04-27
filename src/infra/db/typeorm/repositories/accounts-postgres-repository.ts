import { getRepository, Repository } from 'typeorm';

import {
  CreateUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
} from '@/application/protocols';
import { CreateUserParams } from '@/domain/use-cases';

import { User } from '../entities';

export class AccountsPostgresRepository
  implements
    CreateUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async create(data: CreateUserParams): Promise<void> {
    const { name, email, password, driverLicense } = data;
    const user = this.userRepository.create({
      name,
      email,
      password,
      driverLicense,
    });

    await this.userRepository.save(user);
  }

  async loadByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async loadById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
