import { Category } from '@/domain/entities';
import { AddCategoryParams } from '@/domain/use-cases/cars/add-category';

export interface AddCategoryRepository {
  add(addCategoryData: AddCategoryParams): Promise<Category>;
}
