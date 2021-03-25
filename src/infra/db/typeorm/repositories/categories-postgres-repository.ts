import { getRepository, Repository } from 'typeorm';

import {
  AddCategoryRepository,
  ListCategoriesRepository,
  LoadCategoryByNameRepository,
} from '@/modules/cars/application/protocols';
import { AddCategoryParams } from '@/modules/cars/domain/use-cases';

import { Category } from '../entities/category';

export class CategoriesPostgresRepository
  implements
    AddCategoryRepository,
    LoadCategoryByNameRepository,
    ListCategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async add({ name, description }: AddCategoryParams): Promise<Category> {
    const category = this.repository.create({
      name,
      description,
    });

    return this.repository.save(category);
  }

  async loadByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name });
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }
}
