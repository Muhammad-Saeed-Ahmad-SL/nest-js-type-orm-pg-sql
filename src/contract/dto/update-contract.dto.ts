import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContractDto extends PartialType(CreateContractDto) {
  @ApiProperty({
    description: 'Updated title of the contract',
    example: 'Updated Developer Contract',
  })
  contractTitle?: string;

  @ApiProperty({
    description: 'Updated base salary for the contract',
    example: 75000,
    type: Number,
  })
  baseSalary?: number;

  @ApiProperty({
    description: 'Updated increment percentage for the salary',
    example: 7,
    type: Number,
  })
  incrementPercentage?: number;

  @ApiProperty({
    description: 'Updated list of employee IDs associated with the contract',
    example: ['3131f098-9874-4cad-90c5-fa893fc76a41'],
    type: [String],
  })
  employees?: string[];
}
