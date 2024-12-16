import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import {
  ContractStatus,
  ContractType,
  PaymentFrequency,
} from '../enum/contract.enum';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  contractId: string;

  @Column()
  contractTitle: string;

  // Relationship: Many users can share the same contract
  @ManyToMany(() => User, (user) => user.contracts, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  employees: User[];

  // Basic Information
  @Column({ type: 'date' })
  contractStartDate: Date;

  @Column({ type: 'date', nullable: true })
  contractEndDate: Date;

  @Column({ type: 'enum', enum: ContractType })
  contractType: ContractType;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.ACTIVE,
  })
  status: ContractStatus;

  // Salary Details
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseSalary: number;

  @Column()
  salaryCurrency: string;

  @Column({ type: 'enum', enum: PaymentFrequency })
  salaryPaymentFrequency: PaymentFrequency;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  incrementPercentage: number;

  @Column({ type: 'varchar', nullable: true })
  incrementTenure: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  allowance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxesDeductions: number;

  // Leave Policy
  @Column({ type: 'int', nullable: true })
  paidLeaveDays: number;

  @Column({ type: 'int', nullable: true })
  sickLeaveDays: number;

  @Column({ type: 'int', nullable: true })
  vacationDays: number;

  @Column({ type: 'varchar', nullable: true })
  leaveEncashmentPolicy: string;

  // Benefits and Health
  @Column({ type: 'boolean', default: false })
  healthInsurance: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  medicalAllowance: number;

  @Column({ type: 'text', nullable: true })
  otherBenefits: string;

  // Contract Clauses
  @Column({ type: 'text', nullable: true })
  termsAndConditions: string;

  @Column({ type: 'boolean', default: false })
  confidentialityClause: boolean;

  @Column({ type: 'varchar', nullable: true })
  noticePeriod: string;

  @Column({ type: 'varchar', nullable: true })
  probationPeriod: string;

  @Column({ type: 'text', nullable: true })
  earlyTerminationClause: string;

  // Additional Fields
  @Column({ type: 'text', nullable: true })
  specialConditions: string;

  @Column({ type: 'boolean', default: false })
  approvedByHR: boolean;

  @Column({ type: 'boolean', default: false })
  signedByEmployee: boolean;

  @Column({ type: 'boolean', default: false })
  signedByEmployer: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
