import { mockCategory } from '@/__tests__/domain/mocks';

import { CategoryEntity } from '@/domain/entities';
import {
  AddCategory,
  AddCategoryParams,
  ListCategories,
} from '@/domain/use-cases';

export class AddCategorySpy implements AddCategory {
  params: AddCategoryParams;
  result = mockCategory();

  async add(addAccountData: AddCategoryParams): Promise<CategoryEntity> {
    this.params = addAccountData;

    return this.result;
  }
}

export class ListCategoriesSpy implements ListCategories {
  count = 0;
  result = [mockCategory(), mockCategory()];

  async list(): Promise<CategoryEntity[]> {
    this.count++;

    return this.result;
  }
}
