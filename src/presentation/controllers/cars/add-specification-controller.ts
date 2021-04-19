import { InvalidParamError } from '@/shared/errors';
import { badRequest, created, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { AddSpecification } from '@/domain/use-cases';

type Request = {
  name: string;
  description: string;
};

export class AddSpecificationController implements Controller {
  constructor(private readonly addSpecification: AddSpecification) {}

  async handle(httpRequest: HttpRequest<Request>): Promise<HttpResponse> {
    try {
      const { name, description } = httpRequest;
      const specification = await this.addSpecification.add({
        name,
        description,
      });

      if (!specification) {
        return badRequest(
          new InvalidParamError('specification already exists'),
        );
      }

      return created(specification);
    } catch (error) {
      return serverError(error);
    }
  }
}
