import { IsString, IsNumber, IsArray, IsOptional } from '@nestjs/class-validator';

export class ImportBookDto {
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
  category: string;

  @IsNumber()
  @IsOptional()
  soldCount?: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;
}
