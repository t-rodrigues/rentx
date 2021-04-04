import { DbSpecification } from '@/application/dtos';

export interface ListSpecificationsRepository {
  list(): Promise<DbSpecification[]>;
}
