import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  IsUUID,
} from 'class-validator';
import {
  ContractStatus,
  ContractType,
  PaymentFrequency,
} from '../enum/contract.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({
    description: 'Title of the contract',
    example: 'Software Engineer Contract',
  })
  @IsString()
  contractTitle: string;

  @ApiProperty({
    description: 'Start date of the contract',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  contractStartDate: Date;

  @ApiProperty({
    description: 'End date of the contract',
    required: false,
    example: '2024-12-31T00:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  contractEndDate: Date;

  @ApiProperty({
    description: 'Type of the contract',
    enum: ContractType,
    example: ContractType.PERMANENT,
  })
  @IsEnum(ContractType)
  contractType: ContractType;

  @ApiProperty({
    description: 'Status of the contract',
    enum: ContractStatus,
    required: false,
    example: ContractStatus.ACTIVE,
  })
  @IsEnum(ContractStatus)
  @IsOptional()
  status: ContractStatus;

  @ApiProperty({
    description: 'Base salary for the contract',
    example: 60000,
  })
  @IsNumber()
  baseSalary: number;

  @ApiProperty({
    description: 'Currency for the salary',
    example: 'USD',
  })
  @IsString()
  salaryCurrency: string;

  @ApiProperty({
    description: 'Salary payment frequency',
    enum: PaymentFrequency,
    example: PaymentFrequency.MONTHLY,
  })
  @IsEnum(PaymentFrequency)
  salaryPaymentFrequency: PaymentFrequency;

  @ApiProperty({
    description: 'Increment percentage for the salary',
    required: false,
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  incrementPercentage: number;

  @ApiProperty({
    description: 'Tenure for the increment',
    required: false,
    example: '12 months',
  })
  @IsString()
  @IsOptional()
  incrementTenure: string;

  @ApiProperty({
    description: 'Bonus amount',
    required: false,
    example: 5000,
  })
  @IsNumber()
  @IsOptional()
  bonus: number;

  @ApiProperty({
    description: 'Allowance for the contract',
    required: false,
    example: 2000,
  })
  @IsNumber()
  @IsOptional()
  allowance: number;

  @ApiProperty({
    description: 'Tax deductions for the contract',
    required: false,
    example: 2000,
  })
  @IsNumber()
  @IsOptional()
  taxesDeductions: number;

  @ApiProperty({
    description: 'Paid leave days',
    required: false,
    example: 15,
  })
  @IsNumber()
  @IsOptional()
  paidLeaveDays: number;

  @ApiProperty({
    description: 'Sick leave days',
    required: false,
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  sickLeaveDays: number;

  @ApiProperty({
    description: 'Vacation days',
    required: false,
    example: 20,
  })
  @IsNumber()
  @IsOptional()
  vacationDays: number;

  @ApiProperty({
    description: 'Leave encashment policy',
    required: false,
    example: 'Leave encashment is available after 1 year.',
  })
  @IsString()
  @IsOptional()
  leaveEncashmentPolicy: string;

  @ApiProperty({
    description: 'Health insurance status',
    required: false,
    example: true,
  })
  @IsOptional()
  healthInsurance: boolean;

  @ApiProperty({
    description: 'Medical allowance',
    required: false,
    example: 1000,
  })
  @IsNumber()
  @IsOptional()
  medicalAllowance: number;

  @ApiProperty({
    description: 'Other benefits',
    required: false,
    example: 'Company car, gym membership',
  })
  @IsString()
  @IsOptional()
  otherBenefits: string;

  @ApiProperty({
    description: 'Terms and conditions',
    required: false,
    example: 'Employment is subject to company policies.',
  })
  @IsString()
  @IsOptional()
  termsAndConditions: string;

  @ApiProperty({
    description: 'Confidentiality clause',
    required: false,
    example: true,
  })
  @IsOptional()
  confidentialityClause: boolean;

  @ApiProperty({
    description: 'Notice period',
    required: false,
    example: '30 days',
  })
  @IsString()
  @IsOptional()
  noticePeriod: string;

  @ApiProperty({
    description: 'Probation period',
    required: false,
    example: '3 months',
  })
  @IsString()
  @IsOptional()
  probationPeriod: string;

  @ApiProperty({
    description: 'Early termination clause',
    required: false,
    example: 'Employer can terminate the contract with 1-month notice.',
  })
  @IsString()
  @IsOptional()
  earlyTerminationClause: string;

  @ApiProperty({
    description: 'Special conditions',
    required: false,
    example: 'Must complete a background check.',
  })
  @IsString()
  @IsOptional()
  specialConditions: string;

  @ApiProperty({
    description: 'Approved by HR',
    required: false,
    example: true,
  })
  @IsOptional()
  approvedByHR: boolean;

  @ApiProperty({
    description: 'Signed by employee',
    required: false,
    example: true,
  })
  @IsOptional()
  signedByEmployee: boolean;

  @ApiProperty({
    description: 'Signed by employer',
    required: false,
    example: true,
  })
  @IsOptional()
  signedByEmployer: boolean;

  @ApiProperty({
    description: 'List of employee IDs associated with the contract',
    required: false,
    type: [String],
    example: ['f8a3bc6e-b4e4-4c52-bfc8-b1d3c4fcf8b8'],
  })
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  employees: string[]; // Employee IDs
}
