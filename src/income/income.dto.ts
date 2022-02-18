import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class IncomeDto {

  @IsNotEmpty()
  description: string;

  @IsInt()
  value: number;

  @IsInt()
  userId: number;

  @IsInt()
  monthId: number;
}

export class IncomeUpdateDto {

  @IsOptional()
  description: string;

  @IsOptional()
  @IsInt()
  value: number;
}