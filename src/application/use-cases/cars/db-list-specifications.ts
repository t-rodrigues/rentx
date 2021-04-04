import { ListSpecificationsRepository } from '@/application/protocols';
import { SpecificationEntity } from '@/domain/entities';
import { ListSpecifications } from '@/domain/use-cases';

export class DbListSpecifications implements ListSpecifications {
  constructor(
    private readonly listSpecificationsRepository: ListSpecificationsRepository,
  ) {}

  async list(): Promise<SpecificationEntity[]> {
    await this.listSpecificationsRepository.list();
    return null;
  }
}
