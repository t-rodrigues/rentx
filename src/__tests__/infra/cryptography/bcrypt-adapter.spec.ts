import bcrypt from 'bcrypt';

import { BCryptAdapter } from '@/infra/cryptography';

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
  });
});
