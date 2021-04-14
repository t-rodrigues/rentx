import { ListSpecificationsRepositorySpy } from '@/__tests__/application/mocks';
import { throwError } from '@/__tests__/domain/mocks';

import { DbListSpecifications } from '@/application/use-cases';

const makeSut = () => {
  const listSpecificationsRepositorySpy = new ListSpecificationsRepositorySpy();
  const sut = new DbListSpecifications(listSpecificationsRepositorySpy);

  return {
    sut,
    listSpecificationsRepositorySpy,
  };
};

describe('DbListSpecifications', () => {
  it('should call ListSpecificationsRepository', async () => {
    const { sut, listSpecificationsRepositorySpy } = makeSut();
    await sut.list();

    expect(listSpecificationsRepositorySpy.count).toBe(1);
  });

  it('should throw if ListSpecificationsRepository throws', async () => {
    const { sut, listSpecificationsRepositorySpy } = makeSut();
    jest
      .spyOn(listSpecificationsRepositorySpy, 'list')
      .mockRejectedValueOnce(throwError);
    const promise = sut.list();

    await expect(promise).rejects.toThrow();
  });

  it('should return a list of Specifications on success', async () => {
    const { sut, listSpecificationsRepositorySpy } = makeSut();
    const response = await sut.list();

    expect(response).toEqual(listSpecificationsRepositorySpy.result);
  });
});
