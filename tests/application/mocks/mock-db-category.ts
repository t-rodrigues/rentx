import faker from 'faker';

import {
  LoadCategoryByNameRepository,
  AddCategoryRepository,
} from '@/application/protocols';
import { CategoryEntity } from '@/domain/entities';
import { AddCategoryParams } from '@/domain/use-cases';

export class LoadCategoryByNameRepositorySpy
  implements LoadCategoryByNameRepository {
  name: string;
  result = {
    id: faker.datatype.uuid(),
    name: faker.random.words(2),
    description: faker.lorem.sentences(3),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  async loadByName(name: string): Promise<CategoryEntity> {
    this.name = name;

    return this.result;
  }
}

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryParams;
  result = {
    id: faker.datatype.uuid(),
    name: faker.random.words(2),
    description: faker.lorem.sentences(3),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

  async add(addCategoryData: AddCategoryParams): Promise<CategoryEntity> {
    this.params = addCategoryData;

    return this.result;
  }
}
