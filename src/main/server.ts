import 'reflect-metadata';

import { createConnection } from 'typeorm';

createConnection()
  .then(async () => {
    const { app } = await import('@/shared/config/app');

    app.listen(3333, () => {
      console.log(`server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch(console.error);
