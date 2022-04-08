import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class debtDto {

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsString()
  installmentTotal: string;

  @IsString()
  dateToPay: string;

  @IsString()
  isalreadypay: boolean;

  @IsNotEmpty()
  @IsString()
  groupId: string;
 
  @IsNotEmpty()
  @IsString()
  monthId: string;
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
