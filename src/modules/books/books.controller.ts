import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookViewModel } from './view-models/book-view.model';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<BookViewModel[]> {
    const books = await this.booksService.findAll();
    return books.map((book) => {
      return new BookViewModel(book);
    });
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<BookViewModel> {
    const book = await this.booksService.findOne(id);
    return new BookViewModel(book);
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookViewModel> {
    const book = await this.booksService.create(createBookDto);
    return new BookViewModel(book);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookViewModel> {
    const book = await this.booksService.update(id, updateBookDto);
    return new BookViewModel(book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
