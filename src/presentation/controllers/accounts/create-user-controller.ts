import { InvalidParamError } from '@/shared/errors';
import { badRequest, created, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

import { CreateUser } from '@/domain/use-cases';

type Request = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  driverLicense: string;
};
export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: HttpRequest<Request>): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        password,
        passwordConfirmation,
        driverLicense,
      } = request;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const createUserError = await this.createUser.create({
        name,
        email,
        password,
        driverLicense,
      });

      if (createUserError) {
        return badRequest(createUserError);
      }

      return created('ok');
    } catch (error) {
      return serverError(error);
    }
  }
}
