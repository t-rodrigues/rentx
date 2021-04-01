import { DbSpecification } from '@/application/dtos';
import { LoadSpecificationByNameRepository } from '@/application/protocols';

import { mockSpecification } from '@/tests/domain/mocks';

export class LoadSpecificationByNameRepositorySpy
  implements LoadSpecificationByNameRepository {
  params: string;
  result = mockSpecification();
  async loadByName(name: string): Promise<DbSpecification> {
    this.params = name;

    return this.result;
  }
}
