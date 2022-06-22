import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class debtDto {

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsString()
  installmentTotal: string;

  @IsString()
  dateToPay: string;

  @IsString()
  isalreadypay: boolean;

  @IsString()
  @IsOptional()
  groupid: string;
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
  monthid: number;

  @IsOptional()
  @IsBoolean()
  isalreadypay: boolean;

  @IsOptional()
  @IsInt()
  groupid: number;

  @IsOptional()
  @IsString()
  dateToPay: string;
}
