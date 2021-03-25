import { ListCategoriesRepository } from '@/application/protocols';
import { CategoryEntity } from '@/domain/entities';
import { ListCategories } from '@/domain/use-cases';

export class DbListCategories implements ListCategories {
  constructor(
    private readonly listCategoriesRepository: ListCategoriesRepository,
  ) {}

  async list(): Promise<CategoryEntity[]> {
    return this.listCategoriesRepository.list();
  }
}
