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
import { ImportBookDto } from './dto/import-book.dto';
import { KafkaProducerService } from 'src/shared/kafka/kafka-producer.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

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

  @Post('import')
  async importBooks(
    @Body() importBookDto: { products: ImportBookDto[] },
  ): Promise<void> {
    await this.booksService.importBooks(importBookDto.products);
  }

  @Get('kafka/public-books')
  async kafkaPublicBooks(): Promise<void> {
    const books = await this.booksService.findAll();
    const modifiedBooks = books.map((book) => {
      return new BookViewModel(book);
    });

    this.kafkaProducerService.produce('GetProductFromNestjs', [modifiedBooks]);
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
