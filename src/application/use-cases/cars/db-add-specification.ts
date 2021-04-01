import {
  AddSpecificationRepository,
  LoadSpecificationByNameRepository,
} from '@/application/protocols';
import { SpecificationEntity } from '@/domain/entities';
import { AddSpecification, AddSpecificationParams } from '@/domain/use-cases';

export class DbAddSpecification implements AddSpecification {
  constructor(
    private readonly loadSpecificationByNameRepository: LoadSpecificationByNameRepository,
    private readonly addSpecificationRepository: AddSpecificationRepository,
  ) {}

  async add({
    name,
    description,
  }: AddSpecificationParams): Promise<SpecificationEntity> {
    const specificationExists = await this.loadSpecificationByNameRepository.loadByName(
      name,
    );

    if (specificationExists) {
      return null;
    }

    const specification = await this.addSpecificationRepository.add({
      name,
      description,
    });

    return specification;
  }
}
