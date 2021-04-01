import faker from 'faker';

import { AddSpecificationParams } from '@/domain/use-cases';
import { SpecificationEntity } from '../entities';

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
