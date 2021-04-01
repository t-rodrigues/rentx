import faker from 'faker';

import { AddCategoryParams } from '@/domain/use-cases';

export const mockAddCategoryParams = (): AddCategoryParams => ({
  name: faker.random.word(),
  description: faker.random.words(5),
});
