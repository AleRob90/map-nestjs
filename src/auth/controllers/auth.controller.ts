import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { Public } from '../decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOperation({
    summary: 'Authenticate user based on email and password',
    description: 'Authenticate user based on email and password',
  })
  @ApiBody({
    description: 'Request data to login',
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation errors if necessary',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'UNAUTHORIZED',
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(request);
  }
}
