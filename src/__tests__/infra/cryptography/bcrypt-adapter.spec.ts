import bcrypt from 'bcrypt';

import { env } from '@/main/config/env';
import { BCryptAdapter } from '@/infra/cryptography';
import { throwError } from '@/__tests__/domain/mocks';

const salt = env.bcrypt.salt;
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter();
};

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },

  async compare(): Promise<boolean> {
    return true;
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

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'hashed_value');

      expect(compareSpy).toHaveBeenLastCalledWith('any_value', 'hashed_value');
    });

    it('should throw if compare throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(throwError);
      const promise = sut.compare('any_value', 'hashed_value');

      await expect(promise).rejects.toThrow();
    });

    it('should return false when compare fails', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
      const response = await sut.compare('any_value', 'hashed_value');

      expect(response).toBeFalsy();
    });

    it('should return true when compare succeeds', async () => {
      const sut = makeSut();
      const response = await sut.compare('any_value', 'hashed_value');

      expect(response).toBeTruthy();
    });
  });
});
