import faker from 'faker';

import { SpecificationEntity } from '@/domain/entities';
import { AddSpecificationParams } from '@/domain/use-cases';

export const mockAddSpecificationParams = (): AddSpecificationParams => ({
  name: faker.random.word(),
  description: faker.random.words(5),
});

export const mockSpecification = (): SpecificationEntity => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(2),
  description: faker.lorem.sentences(3),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
});
