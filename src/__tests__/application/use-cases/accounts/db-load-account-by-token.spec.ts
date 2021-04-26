import { DbLoadAccountByToken } from '@/application/use-cases';
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
  });
});
