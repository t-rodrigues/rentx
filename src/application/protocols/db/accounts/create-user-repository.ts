import { CreateUserParams } from '@/domain/use-cases';

export interface CreateUserRepository {
  create(data: CreateUserParams): Promise<void>;
}
