import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Contract } from '../contract/entity/contract.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { contracts, ...rest } = userDto;

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
    const { contracts, ...rest } = updateData;

    const user = await this.findUserById(id);

    Object.assign(user, rest);

    if (contracts && contracts.length > 0) {
      const contractEntities =
        await this.contractRepository.findByIds(contracts);
      user.contracts = contractEntities;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.remove(user);
  }
}
