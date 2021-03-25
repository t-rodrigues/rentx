import csvParse from 'csv-parse';
import fs from 'fs';

import { CsvImport } from '@/application/protocols';

export class CsvAdapter implements CsvImport {
  async read<Object>(path: string): Promise<Object[] | null> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path);
      const lines: Object[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          lines.push(line);
        })
        .on('end', () => {
          fs.promises.unlink(path);
          return resolve(lines);
        })
        .on('error', error => reject(error));
    });
  }
}
