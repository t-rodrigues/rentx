import {
  AddCategoryRepository,
  LoadCategoryByNameRepository,
} from '@/application/protocols/db/cars';
import { CategoryEntity } from '@/domain/entities';

import { AddCategory, AddCategoryParams } from '@/domain/use-cases';

export class DbAddCategory implements AddCategory {
  constructor(
    private readonly addCategoryRepository: AddCategoryRepository,
    private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository,
  ) {}

  async add({ name, description }: AddCategoryParams): Promise<CategoryEntity> {
    const categoryExists = await this.loadCategoryByNameRepository.loadByName(
      name,
    );

    if (categoryExists) {
      return null;
    }

    return this.addCategoryRepository.add({
      name,
      description,
    });
  }
}
