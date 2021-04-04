import faker from 'faker';

import { UserEntity } from '@/domain/entities';
import { DbCreateUserParams } from '@/application/dtos';

export const mockCreateUserParams = (): DbCreateUserParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  driverLicense: faker.random.alphaNumeric(7),
});

export const mockUser = (): UserEntity => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  driverLicense: faker.random.alphaNumeric(7),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.future(),
  admin: false,
});
