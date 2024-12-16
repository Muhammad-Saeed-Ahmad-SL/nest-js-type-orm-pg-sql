import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  roles: Role[];
}
