import { createConnections, ConnectionOptions, Connection } from 'typeorm';

import { env } from '@/main/config/env';

const {
  typeorm: { postgres },
} = env;

export const TypeOrmHelper = {
  connection: null as Connection,

  async connect(test = false): Promise<void> {
    this.connection = await createConnections([
      {
        ...postgres,
        database: test ? postgres.databaseTest : postgres.database,
        dropSchema: test,
        entities: ['src/infra/db/typeorm/entities/*{.ts,.js}'],
        migrations: ['src/infra/db/typeorm/migrations/*{.js,.ts}'],
      } as ConnectionOptions,
    ]);
  },

  async disconnect(): Promise<void> {
    await this.connection.close();
    this.connection = null;
  },
};
