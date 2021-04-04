import { DbAddSpecificationParams, DbSpecification } from '@/application/dtos';
import {
  AddSpecificationRepository,
  ListSpecificationsRepository,
  LoadSpecificationByNameRepository,
} from '@/application/protocols';
import { SpecificationEntity } from '@/domain/entities';

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

export class AddSpecificationRepositorySpy
  implements AddSpecificationRepository {
  params: DbAddSpecificationParams;
  result = mockSpecification();

  async add(data: DbAddSpecificationParams): Promise<DbSpecification> {
    this.params = data;

    return this.result;
  }
}

export class ListSpecificationsRepositorySpy
  implements ListSpecificationsRepository {
  count = 0;
  result = [mockSpecification(), mockSpecification()];

  async list(): Promise<SpecificationEntity[]> {
    this.count++;

    return this.result;
  }
}
