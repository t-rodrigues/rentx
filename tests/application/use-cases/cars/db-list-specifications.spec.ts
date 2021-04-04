import { DbListSpecifications } from '@/application/use-cases';
import { ListSpecificationsRepositorySpy } from '@/tests/application/mocks';
import { throwError } from '@/tests/domain/mocks';

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
});
