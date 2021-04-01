import { mockAddSpecificationParams } from '@/tests/domain/mocks';
import { LoadSpecificationByNameRepositorySpy } from '@/tests/application/mocks';

import { DbAddSpecification } from '@/application/use-cases';

const makeSut = () => {
  const loadSpecificationByNameRepositorySpy = new LoadSpecificationByNameRepositorySpy();
  const sut = new DbAddSpecification(loadSpecificationByNameRepositorySpy);

  return {
    sut,
    loadSpecificationByNameRepositorySpy,
  };
};

describe('DbAddSpecification', () => {
  it('should call loadSpecificationByNameRepository with correct value', async () => {
    const { sut, loadSpecificationByNameRepositorySpy } = makeSut();
    const addSpecificationParams = mockAddSpecificationParams();
    await sut.add(addSpecificationParams);

    expect(loadSpecificationByNameRepositorySpy.params).toEqual(
      addSpecificationParams.name,
    );
  });
});
