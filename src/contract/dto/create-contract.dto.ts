import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ContractStatus,
  ContractType,
  PaymentFrequency,
} from '../enum/contract.enum';

export class CreateContractDto {
  @ApiProperty({
    description: 'Title of the contract',
    example: 'Senior Developer Contract',
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
    example: '2025-01-01T00:00:00Z',
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
    example: 70000,
    type: Number,
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
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  incrementPercentage: number;

  @ApiProperty({
    description: 'Tenure for the increment',
    required: false,
    example: '1 year',
  })
  @IsString()
  @IsOptional()
  incrementTenure: string;

  @ApiProperty({
    description: 'Bonus amount',
    required: false,
    example: 5000,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  bonus: number;

  @ApiProperty({
    description: 'Allowance for the contract',
    required: false,
    example: 2000,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  allowance: number;

  @ApiProperty({
    description: 'Tax deductions for the contract',
    required: false,
    example: 1000,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  taxesDeductions: number;

  @ApiProperty({
    description: 'Paid leave days',
    required: false,
    example: 15,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  paidLeaveDays: number;

  @ApiProperty({
    description: 'Sick leave days',
    required: false,
    example: 10,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  sickLeaveDays: number;

  @ApiProperty({
    description: 'Vacation days',
    required: false,
    example: 20,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  vacationDays: number;

  @ApiProperty({
    description: 'Leave encashment policy',
    required: false,
    example: 'Unused leaves are encashable',
  })
  @IsString()
  @IsOptional()
  leaveEncashmentPolicy: string;

  @ApiProperty({
    description: 'Health insurance status',
    required: false,
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  healthInsurance: boolean;

  @ApiProperty({
    description: 'Medical allowance',
    required: false,
    example: 1000,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  medicalAllowance: number;

  @ApiProperty({
    description: 'Other benefits',
    required: false,
    example: 'Gym membership, free meals',
  })
  @IsString()
  @IsOptional()
  otherBenefits: string;

  @ApiProperty({
    description: 'Terms and conditions',
    required: false,
    example: 'All terms as agreed upon signing',
  })
  @IsString()
  @IsOptional()
  termsAndConditions: string;

  @ApiProperty({
    description: 'Confidentiality clause',
    required: false,
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  confidentialityClause: boolean;

  @ApiProperty({
    description: 'Notice period',
    required: false,
    example: '2 months',
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
    example: 'Allowed with prior notice',
  })
  @IsString()
  @IsOptional()
  earlyTerminationClause: string;

  @ApiProperty({
    description: 'Special conditions',
    required: false,
    example: 'Non-compete clause applies',
  })
  @IsString()
  @IsOptional()
  specialConditions: string;

  @ApiProperty({
    description: 'Approved by HR',
    required: false,
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  approvedByHR: boolean;

  @ApiProperty({
    description: 'Signed by employee',
    required: false,
    example: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  signedByEmployee: boolean;

  @ApiProperty({
    description: 'Signed by employer',
    required: false,
    example: false,
    type: Boolean,
  })
  @IsBoolean()
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
  employees: string[];
}
