import { createConnections, ConnectionOptions, Connection } from 'typeorm';

import { env } from '@/main/config/env';

const {
  typeorm: { postgres },
} = env;

export const TypeOrmHelper = {
  connection: null as Connection,

  async connect(test?: boolean): Promise<void> {
    console.log(postgres);

    this.connection = await createConnections([
      {
        ...postgres,
        database: test ? postgres.databaseTest : postgres.database,
        dropSchema: test,
      } as ConnectionOptions,
    ]);
  },

  async disconnect(): Promise<void> {
    await this.connection.close();
    this.connection = null;
  },
};
