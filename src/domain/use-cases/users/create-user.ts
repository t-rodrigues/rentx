export type CreateUserParams = {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
};

export interface CreateUser {
  create(data: CreateUserParams): Promise<void>;
}
