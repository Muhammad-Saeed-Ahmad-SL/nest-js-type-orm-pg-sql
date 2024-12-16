import {
  IsEmail,
  MinLength,
  IsArray,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsArray()
  @IsOptional()
  roles?: Role[];

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  contracts: string[];
}
