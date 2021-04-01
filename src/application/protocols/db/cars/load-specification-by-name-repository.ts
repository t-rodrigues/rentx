import { DbSpecification } from '@/application/dtos';

export interface LoadSpecificationByNameRepository {
  loadByName(name: string): Promise<DbSpecification>;
}
