import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.schema';
import { CategoriesModule } from '../categories/categories.module';
import { KafkaProducerService } from 'src/shared/kafka/kafka-producer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    CategoriesModule,
    ConfigModule
  ],
  controllers: [BooksController],
  providers: [BooksService, KafkaProducerService],
  exports: [BooksService],
})
export class BooksModule {}
