import express from 'express';
import { CONSTANT } from './constants/constant';
import { AppDataSource } from './database/typeorm-config';

const app = express();
const PORT = CONSTANT.SERVER_PORT;

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
