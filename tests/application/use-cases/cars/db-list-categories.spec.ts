import { ListCategoriesSpy } from '@/tests/application/mocks';

import { DbListCategories } from '@/application/use-cases';

const makeSut = () => {
  const listCategoriesRepository = new ListCategoriesSpy();
  const sut = new DbListCategories(listCategoriesRepository);

  return {
    sut,
    listCategoriesRepository,
  };
};

describe('DbListCategories', () => {
  it('should call ListCategoriesRepository', async () => {
    const { sut, listCategoriesRepository } = makeSut();
    await sut.list();

    expect(listCategoriesRepository.count).toBe(1);
  });
});
