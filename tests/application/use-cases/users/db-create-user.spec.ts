import {
  CreateUserRepositorySpy,
  LoadUserByEmailRepositorySpy,
} from '@/tests/application/mocks';
import { mockCreateUserParams, throwError } from '@/tests/domain/mocks';

import { DbCreateUser } from '@/application/use-cases';
import { HasherSpy } from '../../mocks/mock-cryptography';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const sut = new DbCreateUser(
    loadUserByEmailRepositorySpy,
    hasherSpy,
    createUserRepositorySpy,
  );
  loadUserByEmailRepositorySpy.result = null;

  return {
    sut,
    loadUserByEmailRepositorySpy,
    createUserRepositorySpy,
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

    it('should return null if LoadUserByEmailRepository returns null', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      await sut.create(mockCreateUserParams());

      expect(loadUserByEmailRepositorySpy.result).toBeNull();
    });
  });
});
