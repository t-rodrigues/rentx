import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/cryptography';
import { env } from '@/main/config/env';
import { throwError } from '@/__tests__/domain/mocks';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token';
  },
}));

const secret = env.jwt.secret;
const expiresIn = env.jwt.expiresIn;
const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret, expiresIn);
};

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    it('should call encrypt with correct value', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_user_id');

      expect(signSpy).toHaveBeenCalledWith({ id: 'any_user_id' }, secret, {
        expiresIn,
      });
    });

    it('should throw if encrypt throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError);
      const promise = sut.encrypt('any_id');

      await expect(promise).rejects.toThrow();
    });

    it('should return an token on success', async () => {
      const sut = makeSut();
      const token = await sut.encrypt('any_user_id');
      console.log(token);
      expect(token).toBe('any_token');
    });
  });
});
