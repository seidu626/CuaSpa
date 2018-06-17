export class UserModel {
  id: string;
  username: string;
  email: string;
  userKey: number;
  phoneNumber: string;
  surname: string;
  firstname: string;
  password: string;
  confirmPassword: string;
  creationTime: string;
}

export class PasswordModel {
  id: string;
  password: string;
  confirmPassword: string;
}
