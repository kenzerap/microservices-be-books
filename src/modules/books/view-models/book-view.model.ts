import { Book } from '../books.schema';

export class BookViewModel {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  description?: string;
  categoryId: string;
  soldCount: number;
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Book>) {
    this.id = partial._id as string;
    this.name = partial.name;
    this.price = partial.price;
    this.imageUrls = partial.imageUrls;
    this.description = partial.description;
    this.categoryId = partial.categoryId;
    this.soldCount = partial.soldCount;
    this.discountPercentage = partial.discountPercentage;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
