import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../interfaces/user.interface';

export class UserProfileDto {
  @ApiProperty({
    description: "User's id",
    example: '507f191e810c19729de860ea',
  })
  @IsNotEmpty()
  @IsString()
  id!: string;

  @ApiProperty({
    description: "User's username",
    example: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    description: "User's email",
    example: 'user@domain.com',
  })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({
    description: "User's type",
    example: UserRole.User,
    enum: Object.values(UserRole),
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  type!: UserRole;
}
