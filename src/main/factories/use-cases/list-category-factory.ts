import { DbListCategories } from '@/application/use-cases/cars';
import { CategoriesPostgresRepository } from '@/modules/cars/infra/db/typeorm/repositories';

export const makeDbListCategories = (): DbListCategories => {
  const repository = new CategoriesPostgresRepository();

  return new DbListCategories(repository);
};
