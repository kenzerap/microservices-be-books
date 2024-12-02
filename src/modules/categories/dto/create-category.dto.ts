import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from '@nestjs/class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description: string;
}
