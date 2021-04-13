import { DbAddCategory } from '@/application/use-cases';
import { CategoriesPostgresRepository } from '@/infra/db/typeorm/repositories';

import { AddCategory } from '@/domain/use-cases';

export const makeDbAddCategory = (): AddCategory => {
  const repository = new CategoriesPostgresRepository();

  return new DbAddCategory(repository, repository);
};
