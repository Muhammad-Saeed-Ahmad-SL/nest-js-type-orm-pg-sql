import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsUUID,
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

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  contracts: string[];
}
