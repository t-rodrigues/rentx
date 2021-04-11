export const env = {
  port: process.env.PORT || 3333,
  typeorm: {
    postgres: {
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'rentx',
      password: process.env.DB_PASSWORD || 'docker',
      database: process.env.DB_DATABASE || 'rentx',
      databaseTest: process.env.DB_DATABASE_TEST || 'rentx_test',
      entities: ['src/infra/db/typeorm/entities/*.ts'],
      migrations: ['src/infra/db/typeorm/migrations/*.ts'],
      cli: {
        entitiesDier: 'src/infra/db/typeorm/entites',
        migrationsDir: 'src/infra/db/typeorm/migrations',
      },
    },
  },
};
