import { IsString, IsNumber, IsArray, IsOptional } from '@nestjs/class-validator';

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

  @IsString()
  categoryId: string;

  @IsNumber()
  @IsOptional()
  soldCount?: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;
}
