import { DbAuthentication } from '@/application/use-cases';
import { AcessDeniedError } from '@/domain/errors';

import { LoadUserByEmailRepositorySpy } from '@/__tests__/application/mocks';
import { mockAuthParams, throwError } from '@/__tests__/domain/mocks';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new DbAuthentication(loadUserByEmailRepositorySpy);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('DbAuthentication', () => {
  it('should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const authParams = mockAuthParams();
    const loadByEmailSpy = jest.spyOn(
      loadUserByEmailRepositorySpy,
      'loadByEmail',
    );
    await sut.auth(authParams);

    expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
  });

  it('should return acess denied error if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.result = null;
    const response = await sut.auth(mockAuthParams());

    expect(response).toBeInstanceOf(AcessDeniedError);
  });

  it('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadUserByEmailRepositorySpy, 'loadByEmail')
      .mockRejectedValueOnce(throwError);
    const promise = sut.auth(mockAuthParams());

    await expect(promise).rejects.toThrow();
  });
});
