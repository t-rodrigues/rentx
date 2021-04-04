import { LoadUserByEmailRepositorySpy } from '@/tests/application/mocks';
import { mockCreateUserParams, throwError } from '@/tests/domain/mocks';

import { DbCreateUser } from '@/application/use-cases';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new DbCreateUser(loadUserByEmailRepositorySpy, null, null);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('DbCreateUser', () => {
  describe('LoadUserByEmailRepository', () => {
    it('should call LoadUserByEmailRepository with correct value', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      const createUserParams = mockCreateUserParams();
      await sut.create(createUserParams);

      expect(loadUserByEmailRepositorySpy.email).toBe(createUserParams.email);
    });

    it('should throw if LoadUserByEmailRepository throws', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      jest
        .spyOn(loadUserByEmailRepositorySpy, 'loadByEmail')
        .mockRejectedValueOnce(throwError);
      const promise = sut.create(mockCreateUserParams());

      await expect(promise).rejects.toThrow();
    });
  });
});
