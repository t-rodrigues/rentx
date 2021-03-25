import { noContent, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { ImportCategories } from '@/modules/cars/domain/use-cases';

export class ImportCategoriesController implements Controller {
  constructor(private readonly importCategories: ImportCategories) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.importCategories.import(httpRequest.files);

      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
