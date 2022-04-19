import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IncomeDto {

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class IncomeUpdateDto {

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  value: string;
}