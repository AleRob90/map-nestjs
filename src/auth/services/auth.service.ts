import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/services/user.service';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { AppHttpException } from 'src/shared/exceptions/app-http-exception';

export interface IJwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    userPass: string,
  ): Promise<Omit<IUser, 'password'> | null> {
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser || foundUser.password !== userPass) {
      return null;
    }

    return {
      email: foundUser.email,
      id: foundUser.id,
      type: foundUser.type,
      username: foundUser.username,
    };
  }

  async login(credentials: LoginRequestDto): Promise<LoginResponseDto> | never {
    const userToLogin = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!userToLogin) {
      throw new AppHttpException({
        code: HttpStatus.UNAUTHORIZED,
        message: 'INVALID_CREDENTIALS',
      });
    }
    const jwtPayload: IJwtPayload = {
      id: userToLogin.id,
      email: userToLogin.email, // Probably not mandatory to save as it will not be needed
    };
    return { access_token: this.jwtService.sign(jwtPayload) };
  }
}
