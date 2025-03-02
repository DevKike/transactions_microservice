import { DataSource } from 'typeorm';
import { CONSTANT } from '../constants/constant';

export const AppDataSource = new DataSource({
  type: CONSTANT.DB_TYPE as any,
  host: CONSTANT.DB_HOST,
  port: CONSTANT.DB_PORT,
  username: CONSTANT.DB_USERNAME,
  password: CONSTANT.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [],
});
