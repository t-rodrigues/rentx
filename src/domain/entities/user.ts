export interface UserEntity {
  id: string;
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
