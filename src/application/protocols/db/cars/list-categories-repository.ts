import { Category } from '@/modules/cars/domain/entities';

export interface ListCategoriesRepository {
  list(): Promise<Category[] | []>;
}
