import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/user/services/user.service';
import { IJWTUser } from '../interfaces/jwt-user';
import { IJwtPayload } from './auth.service';
import { jwtSecretThatShouldNotBeStoredHere } from '../constants/jwt-secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretThatShouldNotBeStoredHere,
    });
  }

  async validate(jwtToken: IJwtPayload, done: VerifiedCallback): Promise<void> {
    // Retrieve user from token id
    try {
      const user = await this.userService.findById(jwtToken.id);
      if (!user) {
        return;
      }
      // Found, so authenticated
      const jwtUser: IJWTUser = {
        id: user.id,
        email: user.email,
        type: user.type,
        username: user.username,
      };

      done(null, jwtUser);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
