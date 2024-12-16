import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entity/contract.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), AuthModule],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [TypeOrmModule],
})
export class ContractModule {}
