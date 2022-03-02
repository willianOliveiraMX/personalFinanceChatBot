import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class debtGroupDto {

  @IsString()
  @IsNotEmpty()
  description: string;

}

export class debtGroupUpdateDto {

  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

}
