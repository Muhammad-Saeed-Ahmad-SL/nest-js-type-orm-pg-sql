import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks() {
    return this.bookService.findAll();
  }
  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.findOneBook(id);
  }

  @Post()
  async createBook(@Body() bookDto: CreateBookDto) {
    const user = {
      id: 'a965103e-185a-440f-9218-d56f0943972d',
      name: 'postgres',
      email: 'postgres@gmail.com',
      password: 'password',
    };
    return this.bookService.createBook(bookDto, user);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, bookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.removeBook(id);
  }
}
