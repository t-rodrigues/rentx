import {
  mockAddCategoryParams,
  mockAddSpecificationParams,
  mockSpecification,
  throwError,
} from '@/__tests__/domain/mocks';
import {
  LoadSpecificationByNameRepositorySpy,
  AddSpecificationRepositorySpy,
} from '@/__tests__/application/mocks';

import { DbAddSpecification } from '@/application/use-cases';

const makeSut = () => {
  const loadSpecificationByNameRepositorySpy = new LoadSpecificationByNameRepositorySpy();
  const addSpecificationRepositorySpy = new AddSpecificationRepositorySpy();
  loadSpecificationByNameRepositorySpy.result = null;
  const sut = new DbAddSpecification(
    loadSpecificationByNameRepositorySpy,
    addSpecificationRepositorySpy,
  );

  return {
    sut,
    loadSpecificationByNameRepositorySpy,
    addSpecificationRepositorySpy,
  };
};

describe('DbAddSpecification', () => {
  describe('LoadSpecificationByNameRepository', () => {
    it('should call LoadSpecificationByNameRepository with correct value', async () => {
      const { sut, loadSpecificationByNameRepositorySpy } = makeSut();
      const addSpecificationParams = mockAddSpecificationParams();
      await sut.add(addSpecificationParams);

      expect(loadSpecificationByNameRepositorySpy.params).toBe(
        addSpecificationParams.name,
      );
    });

    it('should return null if LoadSpecificationByNameRepository returns an Specification', async () => {
      const { sut, loadSpecificationByNameRepositorySpy } = makeSut();
      loadSpecificationByNameRepositorySpy.result = mockSpecification();
      const response = await sut.add(mockAddCategoryParams());

      expect(response).toBeNull();
    });

    it('should throw if LoadSpecificationByNameRepository throws', async () => {
      const { sut, loadSpecificationByNameRepositorySpy } = makeSut();
      jest
        .spyOn(loadSpecificationByNameRepositorySpy, 'loadByName')
        .mockRejectedValueOnce(throwError);
      const promise = sut.add(mockAddCategoryParams());

      expect(promise).rejects.toThrow();
    });
  });

  describe('AddSpecificationRepository', () => {
    it('should call AddSpecificationRepository with correct values', async () => {
      const { sut, addSpecificationRepositorySpy } = makeSut();
      const addSpecificationParams = mockAddSpecificationParams();
      await sut.add(addSpecificationParams);

      expect(addSpecificationRepositorySpy.params).toEqual(
        addSpecificationParams,
      );
    });

    it('should throw if AddSpecificationRepository throws', async () => {
      const { sut, addSpecificationRepositorySpy } = makeSut();
      jest
        .spyOn(addSpecificationRepositorySpy, 'add')
        .mockRejectedValueOnce(throwError);
      const promise = sut.add(mockAddCategoryParams());

      expect(promise).rejects.toThrow();
    });

    it('should return an Specification on success', async () => {
      const { sut, addSpecificationRepositorySpy } = makeSut();
      const response = await sut.add(mockAddCategoryParams());

      expect(response).toEqual(addSpecificationRepositorySpy.result);
    });
  });
});
