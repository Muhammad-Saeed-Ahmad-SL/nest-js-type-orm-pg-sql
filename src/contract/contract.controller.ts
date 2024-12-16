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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('contracts')
@ApiTags('Contracts')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({
    status: 201,
    description: 'The contract has been successfully created.',
    type: Contract,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid data provided.',
  })
  async createContract(@Body() contractData: CreateContractDto) {
    return await this.contractService.createContract(contractData);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all contracts' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all contracts.',
    type: [Contract],
  })
  async getAllContracts() {
    return await this.contractService.getAllContracts();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a contract by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the contract',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the contract data.',
    type: Contract,
  })
  @ApiResponse({
    status: 404,
    description: 'Contract not found.',
  })
  async getContractById(@Param('id') contractId: string) {
    return await this.contractService.getContractById(contractId);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the contract',
  })
  @ApiResponse({
    status: 200,
    description: 'The contract has been successfully updated.',
    type: Contract,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided for updating the contract.',
  })
  @ApiResponse({
    status: 404,
    description: 'Contract not found.',
  })
  async updateContract(
    @Param('id') contractId: string,
    @Body() updateData: Partial<Contract>,
  ) {
    return await this.contractService.updateContract(contractId, updateData);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a contract' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the contract',
  })
  @ApiResponse({
    status: 200,
    description: 'The contract has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Contract not found.',
  })
  async deleteContract(@Param('id') contractId: string) {
    return await this.contractService.deleteContract(contractId);
  }
}
