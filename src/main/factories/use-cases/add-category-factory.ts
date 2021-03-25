import { DbAddCategory } from '@/application/use-cases/cars';
import { AddCategory } from '@/modules/cars/domain/use-cases';
import { CategoriesPostgresRepository } from '@/modules/cars/infra/db/typeorm/repositories';

export const makeDbAddCategory = (): AddCategory => {
  const repository = new CategoriesPostgresRepository();

  return new DbAddCategory(repository, repository);
};
