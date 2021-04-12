import { getRepository, Repository } from 'typeorm';

import { DbAddSpecificationParams } from '@/application/dtos';
import {
  AddSpecificationRepository,
  LoadSpecificationByNameRepository,
  ListSpecificationsRepository,
} from '@/application/protocols';

import { Specification } from '@/infra/db/typeorm/entities';

export class SpecificationsRepository
  implements
    AddSpecificationRepository,
    ListSpecificationsRepository,
    LoadSpecificationByNameRepository {
  private respository: Repository<Specification>;

  constructor() {
    this.respository = getRepository(Specification);
  }

  async add({
    name,
    description,
  }: DbAddSpecificationParams): Promise<Specification> {
    const specification = this.respository.create({ name, description });

    return this.respository.save(specification);
  }

  async loadByName(name: string): Promise<Specification> {
    return this.respository.findOne({ name });
  }

  async list(): Promise<Specification[]> {
    return this.respository.find();
  }
}
