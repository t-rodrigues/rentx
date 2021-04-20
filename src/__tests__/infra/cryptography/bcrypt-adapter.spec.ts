import bcrypt from 'bcrypt';

import { BCryptAdapter } from '@/infra/cryptography';
import { throwError } from '@/__tests__/domain/mocks';

const salt = 12;
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt);
};

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

describe('BCryptAdapter', () => {
  describe('hash()', () => {
    it('should call hash with correct values', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');

      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('should throw if hash throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(throwError);
      const promise = sut.hash('any_value');

      await expect(promise).rejects.toThrow();
    });

    it('should return an hash on success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');

      expect(hash).toBe('hash');
    });
  });
});
