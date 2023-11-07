export enum UserRole {
  Admin,
  Moderator,
  User,
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  type: UserRole;
  username: string;
}
