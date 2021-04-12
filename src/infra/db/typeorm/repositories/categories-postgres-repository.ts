import { getRepository, Repository } from 'typeorm';

import { DbAddCategoryParams } from '@/application/dtos';
import {
  AddCategoryRepository,
  ListCategoriesRepository,
  LoadCategoryByNameRepository,
} from '@/application/protocols';

import { Category } from '@/infra/db/typeorm/entities';

export class CategoriesPostgresRepository
  implements
    AddCategoryRepository,
    LoadCategoryByNameRepository,
    ListCategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async add({ name, description }: DbAddCategoryParams): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    return this.repository.save(category);
  }

  async loadByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }
}
