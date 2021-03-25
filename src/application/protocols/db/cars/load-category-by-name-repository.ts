import { Category } from '@/modules/cars/domain/entities';

export interface LoadCategoryByNameRepository {
  loadByName(name: string): Promise<Category | null>;
}
