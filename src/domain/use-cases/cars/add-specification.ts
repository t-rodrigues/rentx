import { SpecificationEntity } from '@/domain/entities';

export type AddSpecificationParams = {
  name: string;
  description: string;
};

export interface AddSpecification {
  add(data: AddSpecificationParams): Promise<SpecificationEntity | null>;
}
