export type AuthParams = {
  email: string;
  password: string;
};

export type User = {
  name: string;
  email: string;
};

export type Auth = {
  accessToken: string;
  user: User;
};

export interface Authentication {
  auth(authParams: AuthParams): Promise<Auth>;
}
