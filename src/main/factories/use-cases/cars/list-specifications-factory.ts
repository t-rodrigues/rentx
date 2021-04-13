import { CategoriesPostgresRepository } from '@/infra/db/typeorm/repositories';

import { DbListSpecifications } from '@/application/use-cases';

export const makeDbListSpecifications = (): DbListSpecifications => {
  const repository = new CategoriesPostgresRepository();

  return new DbListSpecifications(repository);
};
