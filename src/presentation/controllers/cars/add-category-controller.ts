import { InvalidParamError } from '@/shared/errors';
import { badRequest, created, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { AddCategory } from '@/domain/use-cases';

type Request = {
  name: string;
  description: string;
};

export class AddCategoryController implements Controller {
  constructor(private readonly addCategory: AddCategory) {}

  async handle(httpRequest: HttpRequest<Request>): Promise<HttpResponse> {
    try {
      const { name, description } = httpRequest;
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
