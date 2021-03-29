import { noContent, ok, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { ListCategories } from '@/domain/use-cases';

export class ListCategoriesController implements Controller {
  constructor(private readonly listCategories: ListCategories) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categories = await this.listCategories.list();

      if (!categories.length) {
        return noContent();
      }

      return ok(categories);
    } catch (error) {
      return serverError(error);
    }
  }
}
