import { UserEntity } from '@/domain/entities';

export interface LoadUserByIdRepository {
  loadById(id: string): Promise<UserEntity>;
}
