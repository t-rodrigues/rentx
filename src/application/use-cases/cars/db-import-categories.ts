import {
  AddCategoryRepository,
  CsvImport,
  LoadCategoryByNameRepository,
} from '@/application/protocols';
import { File } from '@/domain/entities';
import { ImportCategories } from '@/domain/use-cases';

type CategoryType = {
  name: string;
  description: string;
};

export class DbImportCategories implements ImportCategories {
  constructor(
    private readonly csvImport: CsvImport,
    private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository,
    private readonly addCategoryRepository: AddCategoryRepository,
  ) {}

  async import(file: File): Promise<void> {
    const categories = await this.csvImport.read<CategoryType>(file.path);

    categories.forEach(async category => {
      const { description, name } = category;
      const categoryAlreadyExists = await this.loadCategoryByNameRepository.loadByName(
        name,
      );

      if (!categoryAlreadyExists) {
        await this.addCategoryRepository.add({ name, description });
      }
    });
  }
}
