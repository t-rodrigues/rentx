import { DbLoadAccountByToken } from '@/application/use-cases';
import { throwError } from '@/__tests__/domain/mocks';
import { DecrypterSpy } from '../../mocks';

const makeSut = () => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new DbLoadAccountByToken(decrypterSpy);

  return { sut, decrypterSpy };
};

describe('DbLoadAccountByToken', () => {
  describe('Decrypter', () => {
    it('should call decrypt with correct value', async () => {
      const { sut, decrypterSpy } = makeSut();
      const decryptSpy = jest.spyOn(decrypterSpy, 'decrypt');
      await sut.load('any_token');

      expect(decryptSpy).toHaveBeenCalledWith('any_token');
    });

    it('should throw if decrypt throws', async () => {
      const { sut, decrypterSpy } = makeSut();
      jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(throwError);
      const promise = sut.load('any_token');

      await expect(promise).rejects.toThrow();
    });
  });
});
