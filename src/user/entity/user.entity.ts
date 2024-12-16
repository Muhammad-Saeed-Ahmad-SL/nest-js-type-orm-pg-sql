import { Book } from 'src/book/entity/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

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
}
