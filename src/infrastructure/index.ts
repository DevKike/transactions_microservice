import express from 'express';
import { LOCAL_ENVIRONMENT } from './environments/local.environment';
import { AppDataSource } from './database/config/typeorm.config';

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
