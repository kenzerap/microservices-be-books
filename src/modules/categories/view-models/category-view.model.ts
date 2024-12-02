import { Category } from '../categories.schema';

export class CategoryViewModel {
  id: string;
  name: string;
  code: string;
  imageUrl?: string;
  description?: string;

  constructor(partial: Partial<Category>) {
    this.id = partial._id as string;
    this.name = partial.name;
    this.imageUrl = partial.imageUrl;
    this.description = partial.description;
  }
}
