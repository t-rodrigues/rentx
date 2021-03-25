export interface CsvImport {
  read<T>(path: string): Promise<T[] | null>;
}
