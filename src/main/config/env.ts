export const env = {
  port: process.env.PORT || 3333,
  typeorm: {
    postgres: {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'rentx',
      password: process.env.DB_PASSWORD || 'docker',
      database: process.env.DB_DATABASE || 'rentx',
      databaseTest: process.env.DB_DATABASE_TEST || 'rentx_test',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret123',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
