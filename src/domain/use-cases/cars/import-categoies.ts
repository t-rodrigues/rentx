import { File } from '@/domain/entities';

export interface ImportCategories {
  import(file: File): Promise<void>;
}
