import faker from 'faker';

import { AddCategoryParams } from '@/domain/use-cases';
import { CategoryEntity } from '../entities';

export const mockAddCategoryParams = (): AddCategoryParams => ({
  name: faker.random.word(),
  description: faker.random.words(5),
});

export const mockCategory = (): CategoryEntity => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(2),
  description: faker.lorem.sentences(3),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
});
