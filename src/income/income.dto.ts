import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IncomeDto {

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsInt()
  userid: number;

  @IsInt()
  monthid: number;
}

export class IncomeUpdateDto {

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  value: string;
}