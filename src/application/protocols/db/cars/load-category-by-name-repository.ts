import { CategoryEntity } from '@/domain/entities';

export interface LoadCategoryByNameRepository {
  loadByName(name: string): Promise<CategoryEntity | null>;
}
