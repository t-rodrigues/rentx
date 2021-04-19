import { DbAuthentication } from '@/application/use-cases';

import { LoadUserByEmailRepositorySpy } from '@/__tests__/application/mocks';
import { mockAuthParams } from '@/__tests__/domain/mocks';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new DbAuthentication(loadUserByEmailRepositorySpy);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('DbAuthentication', () => {
  it('should call FindByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const authParams = mockAuthParams();
    const loadByEmailSpy = jest.spyOn(
      loadUserByEmailRepositorySpy,
      'loadByEmail',
    );
    await sut.auth(authParams);

    expect(loadByEmailSpy).toHaveBeenCalledWith(authParams.email);
  });
});
