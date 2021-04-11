import express from 'express';

import { TypeOrmHelper } from '@/infra/db/typeorm';

const app = express();

TypeOrmHelper.connect()
  .then(async () => {
    const { setupSwagger } = await import('./swagger');
    const { setupRoutes } = await import('./routes');

    app.use(express.json());
    setupSwagger(app);
    setupRoutes(app);
  })
  .catch(console.error);

export { app };
