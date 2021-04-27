import { UserEntity } from '@/domain/entities';

export interface LoadAccountByToken {
  load(token: string): Promise<UserEntity>;
}
