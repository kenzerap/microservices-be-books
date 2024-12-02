import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.schema';
import { CategoriesService } from '../categories/categories.service';
import { ImportBookDto } from './dto/import-book.dto';
import { Category, CategoryDocument } from '../categories/categories.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(book: Partial<Book>): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async update(id: string, book: Partial<Book>): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .exec();
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async importBooks(books: ImportBookDto[]): Promise<void> {
    const categories = await this.categoryModel.find().exec();
    console.log('categories: ', categories);

    for (const book of books) {
      const category = categories.find((c) => c.code === book.category);

      if (category) {
        const existingBook = await this.bookModel
          .findOne({ name: book.name })
          .exec();
        if (existingBook) {
          await this.bookModel
            .findByIdAndUpdate(existingBook._id, book, { new: true })
            .exec();
        } else {
          const newBook = new this.bookModel({
            ...book,
            categoryId: category._id,
          });
          await newBook.save();
        }
      }
    }
  }
}
