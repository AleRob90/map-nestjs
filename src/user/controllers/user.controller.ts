import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserProfileDto } from '../dtos/user-profile.dto';
import { JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity('JwtAuth')
  @Get('/profile')
  @ApiOperation({
    summary: 'retrieve the current connected user information',
    description: 'Retrieve the current connected user information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'UNAUTHORIZED',
  })
  @HttpCode(HttpStatus.OK)
  getUserByToken(@JWTUser() user: any): Promise<UserProfileDto> {
    return this.userService.getUserByToken(user);
  }
}
