import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryViewModel } from './view-models/category-view.model';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<CategoryViewModel[]> {
    const categories = await this.categoriesService.findAll();
    return categories.map(category => new CategoryViewModel(category));
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<CategoryViewModel> {
    const category = await this.categoriesService.findOne(id);
    return new CategoryViewModel(category);
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryViewModel> {
    const category = await this.categoriesService.create(createCategoryDto);
    return new CategoryViewModel(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryViewModel> {
    const category = await this.categoriesService.update(id, updateCategoryDto);
    return new CategoryViewModel(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
