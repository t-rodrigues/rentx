import { noContent, ok, serverError } from '@/shared/helpers';
import { Controller, HttpResponse } from '@/shared/protocols';

import { ListSpecifications } from '@/domain/use-cases';

export class ListSpecificationsController implements Controller {
  constructor(private readonly listSpecifications: ListSpecifications) {}

  async handle(): Promise<HttpResponse> {
    try {
      const specifications = await this.listSpecifications.list();

      if (!specifications.length) {
        return noContent();
      }

      return ok(specifications);
    } catch (error) {
      return serverError(error);
    }
  }
}
