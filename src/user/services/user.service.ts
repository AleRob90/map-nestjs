import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser, UserRole } from '../interfaces/user.interface';
import { AppHttpException } from 'src/shared/exceptions/app-http-exception';

@Injectable()
export class UserService {
  // Hardcode users for the moment. Later use mongo probably
  private readonly users: IUser[] = [
    {
      email: 'user@domain.com',
      id: '2',
      password: 'user-password',
      type: UserRole.User,
      username: 'user',
    },
    {
      email: 'admin@domain.com',
      id: '0',
      password: 'admin-password',
      type: UserRole.Admin,
      username: 'admin',
    },
    {
      email: 'moderator@domain.com',
      id: '1',
      password: 'moderator-password',
      type: UserRole.Moderator,
      username: 'moderator',
    },
  ];

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find((user: IUser) => user.email === email) || null;
  }
  async findById(id: string): Promise<IUser | null> {
    return this.users.find((user: IUser) => user.id === id) || null;
  }

  async getUserByToken(user: { id: string }): Promise<Omit<IUser, 'password'>> {
    const foundUser = await this.findById(user.id);
    if (!foundUser) {
      throw new AppHttpException({
        code: HttpStatus.NOT_FOUND,
        message: 'USER_NOT_FOUND',
      });
    }
    return {
      id: foundUser.id,
      email: foundUser.email,
      type: foundUser.type,
      username: foundUser.username,
    };
  }
}
