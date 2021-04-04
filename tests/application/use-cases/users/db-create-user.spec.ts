import { DbCreateUser } from '@/application/use-cases';
import { LoadUserByEmailRepositorySpy } from '@/tests/application/mocks';
import { mockCreateUserParams } from '@/tests/domain/mocks';

const makeSut = () => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new DbCreateUser(loadUserByEmailRepositorySpy, null, null);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('DbCreateUser', () => {
  describe('LoadUserByEmailRepository', () => {
    it('should call LoadUserByEmailRepository with correct value', async () => {
      const { sut, loadUserByEmailRepositorySpy } = makeSut();
      const createUserParams = mockCreateUserParams();
      await sut.create(createUserParams);

      expect(loadUserByEmailRepositorySpy.email).toBe(createUserParams.email);
    });
  });
});
