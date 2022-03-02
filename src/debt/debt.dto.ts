import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class debtDto {

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsInt()
  installmentTotal: number;

  @IsString()
  dateToPay: string;

  @IsBoolean()
  isalreadypay: boolean;

  @IsNotEmpty()
  @IsInt()
  groupId: number;
 
  @IsNotEmpty()
  @IsInt()
  monthId: number;
}

export class debtDtoUpdate {

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  value: string;

  @IsOptional()
  @IsInt()
  monthId: number;

  @IsOptional()
  @IsBoolean()
  isalreadypay: boolean;

  @IsOptional()
  @IsInt()
  groupId: number;

  @IsOptional()
  @IsString()
  dateToPay: string;
}
