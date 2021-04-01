import { SpecificationEntity } from '@/domain/entities';
import { AddSpecificationParams } from '@/domain/use-cases';

export interface AddSpecificationRepository {
  add(data: AddSpecificationParams): Promise<SpecificationEntity>;
}
