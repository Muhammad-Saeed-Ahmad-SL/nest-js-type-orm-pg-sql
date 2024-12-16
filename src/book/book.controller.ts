import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
@ApiBearerAuth('access-token')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' }) // Description of the operation
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all books',
  })
  async getAllBooks() {
    return this.bookService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the book',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async getBookById(@Param('id') id: string) {
    return this.bookService.findOneBook(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    description: 'The book data to create a new book',
    type: CreateBookDto, // Request body using CreateBookDto
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the book',
  })
  async createBook(@Req() req: any, @Body() bookDto: CreateBookDto) {
    const user = req.user;
    return this.bookService.createBook(bookDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiBody({
    description: 'The book data to update',
    type: UpdateBookDto, // Request body using UpdateBookDto
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the book',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async updateBook(@Param('id') id: string, @Body() bookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, bookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the book',
  })
  @ApiResponse({
    status: 404,
    description: 'Book not found',
  })
  async deleteBook(@Param('id') id: string) {
    return this.bookService.removeBook(id);
  }
}
