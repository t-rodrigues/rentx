import { UserEntity } from '@/domain/entities';

export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<UserEntity>;
}
