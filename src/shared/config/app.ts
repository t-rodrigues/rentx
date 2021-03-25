import express from 'express';

import { setupSwagger } from './swagger';
import { setupRoutes } from './routes';

const app = express();

app.use(express.json());

setupSwagger(app);
setupRoutes(app);

export { app };
