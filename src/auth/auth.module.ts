import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt.strategy';
import { jwtSecretThatShouldNotBeStoredHere } from './constants/jwt-secret';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtSecretThatShouldNotBeStoredHere,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
