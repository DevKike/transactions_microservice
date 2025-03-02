import express from 'express';
import { AppDataSource } from './database/typeorm-config';
import { LOCAL_ENVIRONMENT } from './environments/local.environment';

const app = express();
const PORT = LOCAL_ENVIRONMENT.SERVER_PORT;

const initServer = () => {
  app.listen(PORT, async () => {
    try {
      await AppDataSource.initialize();
      console.log('Database connected successfully');
      console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
      console.log('An error occurred', error);
      process.exit(1);
    }
  });
};

initServer();
