import { CategoriesPostgresRepository } from '@/infra/db/typeorm/repositories';

import { DbListCategories } from '@/application/use-cases';

export const makeDbListCategories = (): DbListCategories => {
  const repository = new CategoriesPostgresRepository();

  return new DbListCategories(repository);
};
