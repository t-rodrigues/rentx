import { CategoryEntity } from '@/domain/entities';

export type AddCategoryParams = {
  name: string;
  description: string;
};

export interface AddCategory {
  add(addAccountData: AddCategoryParams): Promise<CategoryEntity | null>;
}
