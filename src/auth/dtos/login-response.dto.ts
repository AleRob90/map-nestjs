import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({
    description: "User's access token",
    example: 'Bearer something here',
  })
  @IsNotEmpty()
  @IsString()
  access_token!: string;
}
