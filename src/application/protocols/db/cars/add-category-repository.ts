import { CategoryEntity } from '@/domain/entities';
import { AddCategoryParams } from '@/domain/use-cases';

export interface AddCategoryRepository {
  add(addCategoryData: AddCategoryParams): Promise<CategoryEntity>;
}
