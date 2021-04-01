import {
  LoadCategoryByNameRepository,
  AddCategoryRepository,
  ListCategoriesRepository,
} from '@/application/protocols';
import { CategoryEntity } from '@/domain/entities';
import { AddCategoryParams } from '@/domain/use-cases';
import { mockCategory } from '@/tests/domain/mocks';

export class LoadCategoryByNameRepositorySpy
  implements LoadCategoryByNameRepository {
  name: string;
  result = mockCategory();

  async loadByName(name: string): Promise<CategoryEntity> {
    this.name = name;

    return this.result;
  }
}

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryParams;
  result = mockCategory();

  async add(addCategoryData: AddCategoryParams): Promise<CategoryEntity> {
    this.params = addCategoryData;

    return this.result;
  }
}

export class ListCategoriesSpy implements ListCategoriesRepository {
  count = 0;
  result = [mockCategory(), mockCategory()];

  async list(): Promise<CategoryEntity[]> {
    this.count++;

    return this.result;
  }
}
