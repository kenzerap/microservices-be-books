import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaFileUploadConsumerService } from './shared/kafka/kafka-file-upload-consumer.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { KafkaProducerService } from './shared/kafka/kafka-producer.service';
import { KafkaProductConsumerService } from './shared/kafka/kafka-product-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.csj0yiv.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
    ),
    CategoriesModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    KafkaFileUploadConsumerService,
    KafkaProductConsumerService
  ],
})
export class AppModule {}
