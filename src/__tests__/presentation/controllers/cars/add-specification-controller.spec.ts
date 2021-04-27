import faker from 'faker';

import { AddSpecificationSpy } from '@/__tests__/presentation/mocks';
import { throwError } from '@/__tests__/domain/mocks';

import { AddSpecificationController } from '@/presentation/controllers';
import { badRequest, created, serverError } from '@/shared/helpers';
import { InvalidParamError } from '@/shared/errors';

const mockRequet = () => ({
  name: faker.name.findName(),
  description: faker.random.words(),
});

const makeSut = () => {
  const addSpecificationSpy = new AddSpecificationSpy();
  const sut = new AddSpecificationController(addSpecificationSpy);

  return {
    sut,
    addSpecificationSpy,
  };
};

describe('AddSpecificationController', () => {
  it('should call AddSpecificationUseCase with correct values', async () => {
    const { sut, addSpecificationSpy } = makeSut();
    const addSpecificationParams = mockRequet();
    await sut.handle(addSpecificationParams);

    expect(addSpecificationSpy.params).toEqual(addSpecificationParams);
  });

  it('should return 400 if category already exists', async () => {
    const { sut, addSpecificationSpy } = makeSut();
    addSpecificationSpy.result = null;
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(
      badRequest(new InvalidParamError('specification already exists')),
    );
  });

  it('should return an category on success', async () => {
    const { sut, addSpecificationSpy } = makeSut();
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(created(addSpecificationSpy.result));
  });

  it('should return 500 if AddSpecificationUseCase throws', async () => {
    const { sut, addSpecificationSpy } = makeSut();
    jest.spyOn(addSpecificationSpy, 'add').mockRejectedValueOnce(throwError);
    const response = await sut.handle(mockRequet());

    expect(response).toEqual(serverError(new Error()));
  });
});
