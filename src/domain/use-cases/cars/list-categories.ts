import { CategoryEntity } from '@/domain/entities';

export interface ListCategories {
  list(): Promise<CategoryEntity[]>;
}
