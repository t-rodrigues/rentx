import { SpecificationEntity } from '@/domain/entities';

export interface ListSpecifications {
  list(): Promise<SpecificationEntity[]>;
}
