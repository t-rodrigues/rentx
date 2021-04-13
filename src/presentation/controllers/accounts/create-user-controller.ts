import { InvalidParamError } from '@/shared/errors';
import { badRequest, created, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { CreateUser } from '@/domain/use-cases';

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        password,
        passwordConfirmation,
        driverLicense,
      } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      await this.createUser.create({
        name,
        email,
        password,
        driverLicense,
      });

      return created('ok');
    } catch (error) {
      return serverError(error);
    }
  }
}
