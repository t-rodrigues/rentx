import faker from 'faker';

import { AddCategoryController } from '@/presentation/controllers';

import { AddCategorySpy } from '@/__tests__/presentation/mocks';

const mockRequet = () => ({
  name: faker.name.findName(),
  description: faker.random.words(),
});

const makeSut = () => {
  const addCategorySpy = new AddCategorySpy();
  const sut = new AddCategoryController(addCategorySpy);

  return {
    sut,
    addCategorySpy,
  };
};

describe('AddCategoryController', () => {
  it('should call AddCategoryUseCase with correct values', async () => {
    const { sut, addCategorySpy } = makeSut();
    const addCategoryParams = mockRequet();
    await sut.handle(addCategoryParams);

    expect(addCategorySpy.params).toEqual(addCategoryParams);
  });
});
