import { DbAuthentication } from '@/application/use-cases';

import {
  EncrypterSpy,
  HashComparerSpy,
  LoadUserByEmailRepositorySpy,
} from '@/__tests__/application/mocks';
import { mockAuthParams, throwError } from '@/__tests__/domain/mocks';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const sut = new DbAuthentication(
    loadUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
  );

  return {
    sut,
    loadUserByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
  };
};

describe('DbAuthentication', () => {
  describe('LoadUserByEmailRepository', () => {
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

    it('should return null if LoadUserByEmailRepository returns null', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      loadUserByEmailRepositorySpy.result = null;
      const response = await sut.auth(mockAuthParams());

      expect(response).toBeNull();
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

  describe('HashComparer', () => {
    it('should call HashComparer with correct values', async () => {
      const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } = makeSut();
      const authParams = mockAuthParams();
      const compareSpy = jest.spyOn(hashComparerSpy, 'compare');
      await sut.auth(authParams);

      expect(compareSpy).toHaveBeenCalledWith(
        authParams.password,
        loadUserByEmailRepositorySpy.result.password,
      );
    });

    it('should return null if HashComparer returns false', async () => {
      const { sut, hashComparerSpy } = makeSut();
      hashComparerSpy.result = false;
      const response = await sut.auth(mockAuthParams());

      expect(response).toBeNull();
    });

    it('should throw if HashComparer throws', async () => {
      const { sut, hashComparerSpy } = makeSut();
      jest.spyOn(hashComparerSpy, 'compare').mockRejectedValueOnce(throwError);
      const promise = sut.auth(mockAuthParams());

      await expect(promise).rejects.toThrow();
    });
  });

  describe('Encrypter', () => {
    it('should call Encrypter with correct values', async () => {
      const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
      const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt');
      await sut.auth(mockAuthParams());

      expect(encryptSpy).toHaveBeenCalledWith(
        loadUserByEmailRepositorySpy.result.id,
      );
    });

    it('should throw if Encrypter throws', async () => {
      const { sut, encrypterSpy } = makeSut();
      jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(throwError);
      const promise = sut.auth(mockAuthParams());

      await expect(promise).rejects.toThrow();
    });

    it('should return an token on sucess', async () => {
      const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
      const response = await sut.auth(mockAuthParams());

      expect(response).toHaveProperty('accessToken');
      expect(response).toEqual({
        accessToken: encrypterSpy.result,
        user: {
          name: loadUserByEmailRepositorySpy.result.name,
          email: loadUserByEmailRepositorySpy.result.email,
        },
      });
    });
  });
});
