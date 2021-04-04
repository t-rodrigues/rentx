import { DbListSpecifications } from '@/application/use-cases';
import { ListSpecificationsRepositorySpy } from '@/tests/application/mocks';

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
});
