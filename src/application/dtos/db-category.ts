import { CategoryEntity } from '@/domain/entities';
import { AddCategoryParams } from '@/domain/use-cases';

export type DbAddCategoryParams = AddCategoryParams;

export type DbCategory = CategoryEntity;
