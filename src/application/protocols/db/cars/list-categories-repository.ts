import { CategoryEntity } from '@/domain/entities';

export interface ListCategoriesRepository {
  list(): Promise<CategoryEntity[] | []>;
}
