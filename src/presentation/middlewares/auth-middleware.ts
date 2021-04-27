import { LoadAccountByToken } from '@/domain/use-cases';
import { AccessDeniedError } from '@/shared/errors';
import { forbidden, ok, serverError } from '@/shared/helpers';
import { HttpRequest, HttpResponse, Middleware } from '@/shared/protocols';

export type Request = {
  accessToken: string;
};

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(request: HttpRequest<Request>): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        const [, token] = accessToken.split(' ');
        const user = await this.loadAccountByToken.load(token);
        if (user) {
          return ok(user);
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
