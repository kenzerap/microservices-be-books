import { IsString, IsNumber, IsArray, IsOptional, IsMongoId } from '@nestjs/class-validator';
import { Types } from 'mongoose';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  categoryId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  soldCount?: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;
}
