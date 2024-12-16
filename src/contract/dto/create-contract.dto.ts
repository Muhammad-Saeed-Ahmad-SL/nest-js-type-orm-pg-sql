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

export class CreateContractDto {
  @IsString()
  contractTitle: string;

  @IsDateString()
  contractStartDate: Date;

  @IsDateString()
  @IsOptional()
  contractEndDate: Date;

  @IsEnum(ContractType)
  contractType: ContractType;

  @IsEnum(ContractStatus)
  @IsOptional()
  status: ContractStatus;

  @IsNumber()
  baseSalary: number;

  @IsString()
  salaryCurrency: string;

  @IsEnum(PaymentFrequency)
  salaryPaymentFrequency: PaymentFrequency;

  @IsNumber()
  @IsOptional()
  incrementPercentage: number;

  @IsString()
  @IsOptional()
  incrementTenure: string;

  @IsNumber()
  @IsOptional()
  bonus: number;

  @IsNumber()
  @IsOptional()
  allowance: number;

  @IsNumber()
  @IsOptional()
  taxesDeductions: number;

  @IsNumber()
  @IsOptional()
  paidLeaveDays: number;

  @IsNumber()
  @IsOptional()
  sickLeaveDays: number;

  @IsNumber()
  @IsOptional()
  vacationDays: number;

  @IsString()
  @IsOptional()
  leaveEncashmentPolicy: string;

  @IsOptional()
  healthInsurance: boolean;

  @IsNumber()
  @IsOptional()
  medicalAllowance: number;

  @IsString()
  @IsOptional()
  otherBenefits: string;

  @IsString()
  @IsOptional()
  termsAndConditions: string;

  @IsOptional()
  confidentialityClause: boolean;

  @IsString()
  @IsOptional()
  noticePeriod: string;

  @IsString()
  @IsOptional()
  probationPeriod: string;

  @IsString()
  @IsOptional()
  earlyTerminationClause: string;

  @IsString()
  @IsOptional()
  specialConditions: string;

  @IsOptional()
  approvedByHR: boolean;

  @IsOptional()
  signedByEmployee: boolean;

  @IsOptional()
  signedByEmployer: boolean;

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  employees: string[]; // Employee IDs
}
