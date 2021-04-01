import { LoadSpecificationByNameRepository } from '@/application/protocols';
import { SpecificationEntity } from '@/domain/entities';
import { AddSpecification, AddSpecificationParams } from '@/domain/use-cases';

export class DbAddSpecification implements AddSpecification {
  constructor(
    private readonly loadSpecificationByNameRepository: LoadSpecificationByNameRepository,
  ) {}

  async add({
    name,
    description,
  }: AddSpecificationParams): Promise<SpecificationEntity> {
    const specification = await this.loadSpecificationByNameRepository.loadByName(
      name,
    );

    if (specification) {
      return null;
    }

    return null;
  }
}
