import faker from 'faker';

import { AuthenticationSpy } from '@/__tests__/presentation/mocks';
import { throwError } from '@/__tests__/domain/mocks';

import { AuthenticationController } from '@/presentation/controllers';
import { badRequest, ok, serverError } from '@/shared/helpers';
import { AccessDeniedError } from '@/shared/errors';

const mockRequest = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const makeSut = () => {
  const authenticationSpy = new AuthenticationSpy();
  const sut = new AuthenticationController(authenticationSpy);

  return { sut, authenticationSpy };
};

describe('AuthenticationController', () => {
  it('should call AuthenticationUseCase with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const authParams = mockRequest();
    await sut.handle(authParams);

    expect(authenticationSpy.params).toEqual(authParams);
  });

  it('should return 400 if invalid data is provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    authenticationSpy.result = null;
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(badRequest(new AccessDeniedError()));
  });

  it('should return 200 on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(ok(authenticationSpy.result));
  });

  it('should return 500 if AuthenticationUseCase throws', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(throwError);
    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });
});
