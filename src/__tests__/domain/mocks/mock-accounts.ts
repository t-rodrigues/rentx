import faker from 'faker';

import { UserEntity } from '@/domain/entities';
import { DbCreateUserParams } from '@/application/dtos';
import { Auth, AuthParams } from '@/domain/use-cases';

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

export const mockAuthParams = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuth = (): Auth => ({
  accessToken: faker.datatype.uuid(),
  user: {
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
});
