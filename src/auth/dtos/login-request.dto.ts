import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: "User's email",
    example: 'user@domain.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({
    description: "User's password",
    example: 'user-password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
