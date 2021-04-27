import faker from 'faker';

import { AddCategorySpy } from '@/__tests__/presentation/mocks';
import { throwError } from '@/__tests__/domain/mocks';

import { AddCategoryController } from '@/presentation/controllers';
import { badRequest, created, serverError } from '@/shared/helpers';
import { InvalidParamError } from '@/shared/errors';

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

  it('should return 400 if category already exists', async () => {
    const { sut, addCategorySpy } = makeSut();
    addCategorySpy.result = null;
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(
      badRequest(new InvalidParamError('category already exists')),
    );
  });

  it('should return an category on success', async () => {
    const { sut, addCategorySpy } = makeSut();
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(created(addCategorySpy.result));
  });

  it('should return 500 if AddCategoryUseCase throws', async () => {
    const { sut, addCategorySpy } = makeSut();
    jest.spyOn(addCategorySpy, 'add').mockRejectedValueOnce(throwError);
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(serverError(new Error()));
  });
});
