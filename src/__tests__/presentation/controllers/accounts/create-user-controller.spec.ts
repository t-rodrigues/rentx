import faker from 'faker';

import { CreateUserSpy } from '@/__tests__/presentation/mocks';
import { throwError } from '@/__tests__/domain/mocks';

import { CreateUserController } from '@/presentation/controllers';
import { badRequest, created, serverError } from '@/shared/helpers';
import { EmailAlreadyInUseError, InvalidParamError } from '@/shared/errors';

const password = faker.internet.password();
const mockRequest = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password,
  driverLicense: faker.random.alphaNumeric(7),
});

const makeSut = () => {
  const createUserSpy = new CreateUserSpy();
  const sut = new CreateUserController(createUserSpy);

  return { sut, createUserSpy };
};

describe('CreateUserController', () => {
  it('should call CreateUserUseCase with correct values', async () => {
    const { sut, createUserSpy } = makeSut();
    const createUserParams = mockRequest();
    await sut.handle(createUserParams);

    expect(createUserSpy.params).toEqual({
      name: createUserParams.name,
      email: createUserParams.email,
      password: createUserParams.password,
      driverLicense: createUserParams.driverLicense,
    });
  });

  it('should return 400 if passwordConfirmation fails', async () => {
    const { sut } = makeSut();
    const createUserParams = mockRequest();
    createUserParams.passwordConfirmation = 'wrong_confirmation';
    const response = await sut.handle(createUserParams);

    expect(response).toEqual(
      badRequest(new InvalidParamError('passwordConfirmation')),
    );
  });

  it('should return 400 if email already exists', async () => {
    const { sut, createUserSpy } = makeSut();
    createUserSpy.result = null;
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(badRequest(new EmailAlreadyInUseError()));
  });

  it('should return 500 if CreateUserUseCase throws', async () => {
    const { sut, createUserSpy } = makeSut();
    jest.spyOn(createUserSpy, 'create').mockRejectedValueOnce(throwError);
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  it('should return 201 on success', async () => {
    const { sut, createUserSpy } = makeSut();
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(created(createUserSpy.result));
  });
});
