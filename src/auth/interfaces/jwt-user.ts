import { UserRole } from 'src/user/interfaces/user.interface';

export interface IJWTUser {
  id: string;
  email: string;
  username: string;
  type: UserRole;
}
