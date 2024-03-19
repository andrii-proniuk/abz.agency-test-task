import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^\+380\d+/)
  @IsPhoneNumber('UA')
  phone: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  position_id: number;
}
