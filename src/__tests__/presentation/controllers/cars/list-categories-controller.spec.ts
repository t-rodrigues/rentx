import { throwError } from '@/__tests__/domain/mocks';
import { ListCategoriesSpy } from '@/__tests__/presentation/mocks';

import { ListCategoriesController } from '@/presentation/controllers';
import { noContent, ok, serverError } from '@/shared/helpers';

const makeSut = () => {
  const listCategoriesSpy = new ListCategoriesSpy();
  const sut = new ListCategoriesController(listCategoriesSpy);

  return { sut, listCategoriesSpy };
};

describe('ListCategoriesController', () => {
  it('should call ListCategoriesUseCase', async () => {
    const { sut, listCategoriesSpy } = makeSut();
    await sut.handle();

    expect(listCategoriesSpy.count).toBe(1);
  });

  it('should return 204 if no category is registered', async () => {
    const { sut, listCategoriesSpy } = makeSut();
    listCategoriesSpy.result = [];
    const response = await sut.handle();

    expect(response).toEqual(noContent());
  });

  it('should return an list of categories on success', async () => {
    const { sut, listCategoriesSpy } = makeSut();
    const response = await sut.handle();

    expect(response).toEqual(ok(listCategoriesSpy.result));
  });

  it('should return 500 if ListCategoriesUseCase throws', async () => {
    const { sut, listCategoriesSpy } = makeSut();
    jest.spyOn(listCategoriesSpy, 'list').mockRejectedValueOnce(throwError);
    const response = await sut.handle();

    expect(response).toEqual(serverError(new Error()));
  });
});
