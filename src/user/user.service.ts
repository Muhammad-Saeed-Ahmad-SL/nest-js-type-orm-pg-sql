import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Contract } from '../contract/entity/contract.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  private validateUUID(id: string): void {
    if (!isUUID(id)) {
      throw new BadRequestException(`${id} is not a valid UUID`);
    }
  }
  async createUser(userDto: CreateUserDto): Promise<User> {
    const { contracts, ...rest } = userDto;

    // Validate each contract ID to ensure they are valid UUIDs
    if (contracts && contracts.length > 0) {
      contracts.forEach((contractId) => this.validateUUID(contractId));
    }
    // Initialize user
    const user = this.userRepository.create(rest);

    if (contracts && contracts.length > 0) {
      // Resolve contract IDs to entities
      const contractEntities =
        await this.contractRepository.findByIds(contracts);
      user.contracts = contractEntities;
    }

    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    this.validateUUID(id);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async updateUser(
    id: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    this.validateUUID(id);
    const { contracts, ...rest } = updateData;

    const user = await this.findUserById(id);

    Object.assign(user, rest);

    if (contracts && contracts.length > 0) {
      // Validate each contract ID before fetching
      contracts.forEach((contractId) => this.validateUUID(contractId));

      const contractEntities =
        await this.contractRepository.findByIds(contracts);
      user.contracts = contractEntities;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    this.validateUUID(id);
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }
}
