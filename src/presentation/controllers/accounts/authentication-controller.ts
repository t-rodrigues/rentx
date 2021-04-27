import { Authentication } from '@/domain/use-cases';
import { AccessDeniedError } from '@/shared/errors';
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
        return badRequest(new AccessDeniedError());
      }

      return ok(authentication);
    } catch (error) {
      return serverError(error);
    }
  }
}
