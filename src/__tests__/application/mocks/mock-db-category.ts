import { DbAddCategoryParams, DbCategory } from '@/application/dtos';
import {
  LoadCategoryByNameRepository,
  AddCategoryRepository,
  ListCategoriesRepository,
} from '@/application/protocols';
import { mockCategory } from '@/__tests__/domain/mocks';

export class LoadCategoryByNameRepositorySpy
  implements LoadCategoryByNameRepository {
  name: string;
  result = mockCategory();

  async loadByName(name: string): Promise<DbCategory> {
    this.name = name;

    return this.result;
  }
}

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: DbAddCategoryParams;
  result = mockCategory();

  async add(addCategoryData: DbAddCategoryParams): Promise<DbCategory> {
    this.params = addCategoryData;

    return this.result;
  }
}

export class ListCategoriesSpy implements ListCategoriesRepository {
  count = 0;
  result = [mockCategory(), mockCategory()];

  async list(): Promise<DbCategory[]> {
    this.count++;

    return this.result;
  }
}
