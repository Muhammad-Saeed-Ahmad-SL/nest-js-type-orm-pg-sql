import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user, must be at least 6 characters long',
    type: String,
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Roles assigned to the user',
    type: [String],
    enum: Role,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  roles: Role[];

  @ApiProperty({
    description: 'List of contract IDs associated with the user (optional)',
    type: [String],
    required: false,
    isArray: true,
  })
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  contracts: string[];
}
