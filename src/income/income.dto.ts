import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

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