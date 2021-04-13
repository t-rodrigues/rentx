import { getRepository, Repository } from 'typeorm';

import {
  CreateUserRepository,
  LoadUserByEmailRepository,
} from '@/application/protocols';
import { CreateUserParams } from '@/domain/use-cases';

import { User } from '../entities';

export class AccountsPostgresRepository
  implements CreateUserRepository, LoadUserByEmailRepository {
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

  async loadByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
