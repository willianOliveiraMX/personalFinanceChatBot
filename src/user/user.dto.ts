import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  token: string;
}