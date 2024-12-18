import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entity/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { User } from 'src/user/entity/user.entity';
import { isUUID } from 'class-validator';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  private validateUUID(id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException(`${id} is not a valid UUID`);
    }
  }

  async createContract(contractData: CreateContractDto): Promise<Contract> {
    const { employees, ...contractDetails } = contractData;

    let employeeEntities: User[] = [];
    if (employees && employees.length > 0) {
      // Fetch the User entities based on the provided employee IDs
      employees.forEach((employeeId) => this.validateUUID(employeeId));

      employeeEntities = await this.contractRepository.manager
        .getRepository(User)
        .findByIds(employees);

      if (employeeEntities.length !== employees.length) {
        throw new NotFoundException('Employee not found');
      }
    }

    const contract = this.contractRepository.create({
      ...contractDetails,
      employees: employeeEntities.length > 0 ? employeeEntities : undefined, // Assign employees only if provided
    });

    return await this.contractRepository.save(contract);
  }

  async getAllContracts(): Promise<Contract[]> {
    return await this.contractRepository.find({ relations: ['employees'] });
  }

  async getContractById(contractId: string): Promise<Contract> {
    this.validateUUID(contractId);
    const contract = await this.contractRepository.findOne({
      where: { contractId },
      relations: ['employees'],
    });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    return contract;
  }

  async updateContract(
    contractId: string,
    updateData: UpdateContractDto,
  ): Promise<Contract> {
    this.validateUUID(contractId);
    const contract = await this.getContractById(contractId);
    Object.assign(contract, updateData);
    return await this.contractRepository.save(contract);
  }

  async deleteContract(contractId: string): Promise<void> {
    this.validateUUID(contractId);
    const contract = await this.getContractById(contractId);
    await this.contractRepository.remove(contract);
  }
}
