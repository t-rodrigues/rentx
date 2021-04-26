import { AcessDeniedError } from '@/domain/errors';
import { Authentication } from '@/domain/use-cases';
import { badRequest, ok, serverError } from '@/shared/helpers';
import { Controller, HttpRequest, HttpResponse } from '@/shared/protocols';

type Request = {
  email: string;
  password: string;
};

export class AuthenticationController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(request: HttpRequest<Request>): Promise<HttpResponse> {
    try {
      const { email, password } = request;
      const authentication = await this.authentication.auth({
        email,
        password,
      });

      if (!authentication) {
        return badRequest(new AcessDeniedError());
      }

      return ok(authentication);
    } catch (error) {
      return serverError(error);
    }
  }
}
