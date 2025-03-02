import { DataSource } from 'typeorm';
import { LOCAL_ENVIRONMENT } from '../../environments/local.environment';
import { Account } from '../entities/account.entity';

export const AppDataSource = new DataSource({
  type: LOCAL_ENVIRONMENT.DB_TYPE as any,
  host: LOCAL_ENVIRONMENT.DB_HOST,
  port: LOCAL_ENVIRONMENT.DB_PORT,
  username: LOCAL_ENVIRONMENT.DB_USERNAME,
  password: LOCAL_ENVIRONMENT.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [Account],
});
