import {
  CreateUserRepositorySpy,
  HasherSpy,
  LoadUserByEmailRepositorySpy,
} from '@/tests/application/mocks';
import {
  mockCreateUserParams,
  mockUser,
  throwError,
} from '@/tests/domain/mocks';

import { DbCreateUser } from '@/application/use-cases';

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
    hasherSpy,
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

    it('should return null if an Existing email is registered', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      loadUserByEmailRepositorySpy.result = mockUser();
      const resposne = await sut.create(mockCreateUserParams());

      expect(resposne).toBeNull();
    });
  });

  describe('Hasher', () => {
    it('should call Hasher with correct value', async () => {
      const { sut, hasherSpy } = makeSut();
      const createUserParams = mockCreateUserParams();
      await sut.create(createUserParams);

      expect(hasherSpy.plaintext).toBe(createUserParams.password);
    });

    it('should throw if Hasher throws', async () => {
      const { sut, hasherSpy } = makeSut();
      jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(throwError);
      const promise = sut.create(mockCreateUserParams());

      await expect(promise).rejects.toThrow();
    });
  });

  describe('CreateUserRepository', () => {
    it('should call CreateUserRepository with correct values', async () => {
      const { sut, hasherSpy, createUserRepositorySpy } = makeSut();
      const createUserParams = mockCreateUserParams();
      await sut.create(createUserParams);

      expect(createUserRepositorySpy.params).toEqual({
        name: createUserParams.name,
        email: createUserParams.email,
        password: hasherSpy.digest,
        driverLicense: createUserParams.driverLicense,
      });
    });

    it('should throw if CreateUserRepository throws', async () => {
      const { sut, createUserRepositorySpy } = makeSut();
      jest
        .spyOn(createUserRepositorySpy, 'create')
        .mockRejectedValueOnce(throwError);
      const promise = sut.create(mockCreateUserParams());

      await expect(promise).rejects.toThrow();
    });
  });
});
