import { AddCategory } from '@/modules/cars/domain/use-cases';

import { InvalidParamError } from '@/shared/errors';
import { badRequest, created, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

export class AddCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, description } = httpRequest.body;

      const category = await this.addCategory.add({ name, description });

      if (!category) {
        return badRequest(new InvalidParamError('category already exists'));
      }

      return created(category);
    } catch (error) {
      return serverError(error);
    }
  }
}
