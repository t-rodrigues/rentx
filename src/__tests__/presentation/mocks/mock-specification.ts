import { SpecificationEntity } from '@/domain/entities';
import {
  AddSpecification,
  AddSpecificationParams,
  ListSpecifications,
} from '@/domain/use-cases';
import { mockSpecification } from '@/__tests__/domain/mocks';

export class AddSpecificationSpy implements AddSpecification {
  params: AddSpecificationParams;
  result = mockSpecification();

  async add(data: AddSpecificationParams): Promise<SpecificationEntity> {
    this.params = data;

    return this.result;
  }
}

export class ListSpecificationsSpy implements ListSpecifications {
  count = 0;
  result = [mockSpecification(), mockSpecification()];

  async list(): Promise<SpecificationEntity[]> {
    this.count++;

    return this.result;
  }
}
