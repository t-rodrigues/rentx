import { UserEntity } from '@/domain/entities';
import { CreateUserParams } from '@/domain/use-cases';

export type DbCreateUserParams = CreateUserParams;

export type DbUser = UserEntity;
