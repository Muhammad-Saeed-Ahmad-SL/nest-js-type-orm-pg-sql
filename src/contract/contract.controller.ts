import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './entity/contract.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateContractDto } from './dto/create-contract.dto';

@Controller('contracts')
@UseGuards(AuthGuard, RolesGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @Roles('admin')
  async createContract(@Body() contractData: CreateContractDto) {
    return await this.contractService.createContract(contractData);
  }

  @Get()
  @Roles('admin')
  async getAllContracts() {
    return await this.contractService.getAllContracts();
  }

  @Get(':id')
  async getContractById(@Param('id') contractId: string) {
    return await this.contractService.getContractById(contractId);
  }

  @Put(':id')
  @Roles('admin')
  async updateContract(
    @Param('id') contractId: string,
    @Body() updateData: Partial<Contract>,
  ) {
    return await this.contractService.updateContract(contractId, updateData);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteContract(@Param('id') contractId: string) {
    return await this.contractService.deleteContract(contractId);
  }
}
