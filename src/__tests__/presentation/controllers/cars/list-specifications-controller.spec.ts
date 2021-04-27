import { throwError } from '@/__tests__/domain/mocks';
import { ListSpecificationsSpy } from '@/__tests__/presentation/mocks';

import { ListSpecificationsController } from '@/presentation/controllers';
import { noContent, ok, serverError } from '@/shared/helpers';

const makeSut = () => {
  const listSpecificationsSpy = new ListSpecificationsSpy();
  const sut = new ListSpecificationsController(listSpecificationsSpy);

  return { sut, listSpecificationsSpy };
};

describe('ListSpecificationsController', () => {
  it('should call ListSpecificationsUseCase', async () => {
    const { sut, listSpecificationsSpy } = makeSut();
    await sut.handle();

    expect(listSpecificationsSpy.count).toBe(1);
  });

  it('should return 204 if no specifications is registered', async () => {
    const { sut, listSpecificationsSpy } = makeSut();
    listSpecificationsSpy.result = [];
    const response = await sut.handle();

    expect(response).toEqual(noContent());
  });

  it('should return an list of specifications on success', async () => {
    const { sut, listSpecificationsSpy } = makeSut();
    const response = await sut.handle();

    expect(response).toEqual(ok(listSpecificationsSpy.result));
  });

  it('should return 500 if ListSpecificationsUseCase throws', async () => {
    const { sut, listSpecificationsSpy } = makeSut();
    jest.spyOn(listSpecificationsSpy, 'list').mockRejectedValueOnce(throwError);
    const response = await sut.handle();

    expect(response).toEqual(serverError(new Error()));
  });
});
