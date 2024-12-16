import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  createBook(bookDto: CreateBookDto, user: any): Promise<Book> {
    const book = this.bookRepository.create({ ...bookDto, user });
    return this.bookRepository.save(book);
  }

  async findOneBook(id: string): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOneBook(id);

    Object.assign(book, bookDto);

    return await this.bookRepository.save(book);
  }

  async removeBook(id: string): Promise<void> {
    const book = await this.findOneBook(id);

    await this.bookRepository.delete(book);
  }
}
