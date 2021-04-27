import { DbLoadAccountByToken } from '@/application/use-cases';
import { throwError } from '@/__tests__/domain/mocks';
import {
  DecrypterSpy,
  LoadUserByIdRepositorySpy,
} from '@/__tests__/application/mocks';

const makeSut = () => {
  const decrypterSpy = new DecrypterSpy();
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new DbLoadAccountByToken(decrypterSpy, loadUserByIdRepositorySpy);

  return { sut, decrypterSpy, loadUserByIdRepositorySpy };
};

describe('DbLoadAccountByToken', () => {
  describe('Decrypter', () => {
    it('should call decrypt with correct value', async () => {
      const { sut, decrypterSpy } = makeSut();
      await sut.load('any_token');

      expect(decrypterSpy.ciphertext).toBe('any_token');
    });

    it('should return null if an invalid token are provided', async () => {
      const { sut, decrypterSpy } = makeSut();
      decrypterSpy.result = null;
      const response = await sut.load('invalid_token');

      expect(response).toBeNull();
    });

    it('should throw if decrypt throws', async () => {
      const { sut, decrypterSpy } = makeSut();
      jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(throwError);
      const promise = sut.load('any_token');

      await expect(promise).rejects.toThrow();
    });

    it('should return an valid user id if decrypt succeeds', async () => {
      const { sut, decrypterSpy, loadUserByIdRepositorySpy } = makeSut();
      await sut.load('any_token');

      expect(loadUserByIdRepositorySpy.id).toBe(decrypterSpy.result);
    });
  });

  describe('LoadUserById', () => {
    it('should call LoadUserById with correct value', async () => {
      const { sut, loadUserByIdRepositorySpy, decrypterSpy } = makeSut();
      await sut.load('any_token');

      expect(loadUserByIdRepositorySpy.id).toBe(decrypterSpy.result);
    });

    it('should return null if is an invalid user id', async () => {
      const { sut, loadUserByIdRepositorySpy } = makeSut();
      loadUserByIdRepositorySpy.result = null;
      const response = await sut.load('any_token');

      expect(response).toBeNull();
    });

    it('should throw if LoadUserById throws', async () => {
      const { sut, loadUserByIdRepositorySpy } = makeSut();
      jest
        .spyOn(loadUserByIdRepositorySpy, 'loadById')
        .mockRejectedValueOnce(throwError);
      const promise = sut.load('any_token');

      expect(promise).rejects.toThrow();
    });

    it('should return an user on success', async () => {
      const { sut, loadUserByIdRepositorySpy } = makeSut();
      const response = await sut.load('any_token');

      expect(response).toEqual(loadUserByIdRepositorySpy.result);
    });
  });
});
