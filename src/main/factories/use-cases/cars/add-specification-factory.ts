import { DbAddSpecification } from '@/application/use-cases';
import { SpecificationsPostgresRepository } from '@/infra/db/typeorm/repositories';

import { AddSpecification } from '@/domain/use-cases';

export const makeDbAddSpecification = (): AddSpecification => {
  const repository = new SpecificationsPostgresRepository();

  return new DbAddSpecification(repository, repository);
};
