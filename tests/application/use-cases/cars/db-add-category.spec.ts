import {
  LoadCategoryByNameRepositorySpy,
  AddCategoryRepositorySpy,
} from '@/tests/application/mocks';
import {
  mockAddCategoryParams,
  mockCategory,
  throwError,
} from '@/tests/domain/mocks';

import { DbAddCategory } from '@/application/use-cases';

type SutTypes = {
  sut: DbAddCategory;
  loadCategoryByNameRepositorySpy: LoadCategoryByNameRepositorySpy;
  addCategoryRepositorySpy: AddCategoryRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadCategoryByNameRepositorySpy = new LoadCategoryByNameRepositorySpy();
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy();
  loadCategoryByNameRepositorySpy.result = null;
  const sut = new DbAddCategory(
    addCategoryRepositorySpy,
    loadCategoryByNameRepositorySpy,
  );

  return {
    sut,
    loadCategoryByNameRepositorySpy,
    addCategoryRepositorySpy,
  };
};

describe('DbAddCategoryUseCase', () => {
  describe('LoadCategoryByNameRepository', () => {
    it('should call LoadCategoryByNameRepository with correct values', async () => {
      const { sut, loadCategoryByNameRepositorySpy } = makeSut();
      const addCategoryParams = mockAddCategoryParams();
      await sut.add(addCategoryParams);

      expect(loadCategoryByNameRepositorySpy.name).toBe(addCategoryParams.name);
    });

    it('should return null if category already exists', async () => {
      const { sut, loadCategoryByNameRepositorySpy } = makeSut();
      loadCategoryByNameRepositorySpy.result = mockCategory();
      const response = await sut.add(mockAddCategoryParams());

      expect(response).toBeNull();
    });

    it('should throw if LoadCategoryByNameRepository throws', async () => {
      const { sut, loadCategoryByNameRepositorySpy } = makeSut();
      jest
        .spyOn(loadCategoryByNameRepositorySpy, 'loadByName')
        .mockRejectedValueOnce(throwError);

      const promise = sut.add(mockAddCategoryParams());

      await expect(promise).rejects.toThrow();
    });
  });

  describe('AddCategoryRepository', () => {
    it('should call AddCategoryRepository with correct values', async () => {
      const { sut, addCategoryRepositorySpy } = makeSut();
      const addCategoryParams = mockAddCategoryParams();
      await sut.add(addCategoryParams);

      expect(addCategoryRepositorySpy.params).toEqual(addCategoryParams);
    });

    it('should throw if AddCategoryRepository throws', async () => {
      const { sut, addCategoryRepositorySpy } = makeSut();
      jest
        .spyOn(addCategoryRepositorySpy, 'add')
        .mockRejectedValueOnce(throwError);

      const promise = sut.add(mockAddCategoryParams());

      await expect(promise).rejects.toThrow();
    });

    it('should return an category on success', async () => {
      const { sut, addCategoryRepositorySpy } = makeSut();
      const category = await sut.add(mockAddCategoryParams());

      expect(category).toEqual(addCategoryRepositorySpy.result);
    });
  });
});
