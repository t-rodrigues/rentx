import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/cryptography';
import { env } from '@/main/config/env';
import { throwError } from '@/__tests__/domain/mocks';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },

  verify(): any {
    return {
      userId: 'decoded',
    };
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter();
};

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    it('should call encrypt with correct value', async () => {
      const sut = makeSut();
      const secret = env.jwt.secret;
      const expiresIn = env.jwt.expiresIn;
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_user_id');

      expect(signSpy).toHaveBeenCalledWith({ userId: 'any_user_id' }, secret, {
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

      expect(token).toBe('any_token');
    });
  });

  describe('decrypt()', () => {
    it('should call verify with correct values', async () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');

      expect(verifySpy).toHaveBeenCalledWith('any_token', env.jwt.secret);
    });

    it('should return null if verify fails', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError);
      const response = await sut.decrypt('any_token');

      expect(response).toBeNull();
    });

    it('should return decoded data on success', async () => {
      const sut = makeSut();
      const decoded = await sut.decrypt('any_token');

      expect(decoded).toBe('decoded');
    });
  });
});
