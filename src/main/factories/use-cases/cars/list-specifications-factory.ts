import { SpecificationsPostgresRepository } from '@/infra/db/typeorm/repositories';

import { DbListSpecifications } from '@/application/use-cases';

export const makeDbListSpecifications = (): DbListSpecifications => {
  const repository = new SpecificationsPostgresRepository();

  return new DbListSpecifications(repository);
};
