import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Category } from '../categories/categories.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  imageUrls: string[];

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  categoryId: Types.ObjectId;

  @Prop({ default: 0 })
  soldCount: number;

  @Prop({ default: 0 })
  discountPercentage: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
