import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/cryptography';
import { env } from '@/main/config/env';

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
  });
});
