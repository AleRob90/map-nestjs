import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
