import { AcessDeniedError } from '@/domain/errors';

export type AuthParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(authParams: AuthParams): Promise<string | AcessDeniedError>;
}
