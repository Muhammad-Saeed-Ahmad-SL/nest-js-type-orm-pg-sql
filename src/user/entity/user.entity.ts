import { Book } from 'src/book/entity/book.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Contract } from 'src/contract/entity/contract.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('simple-array', { default: Role.Employee }) // Store roles as an array
  roles: Role[];

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  @ManyToMany(() => Contract, (contract) => contract.employees)
  contracts: Contract[];
}
