export const LOCAL_ENVIRONMENT = {
  SERVER_PORT: Number(process.env.SERVER_PORT),

  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  LOG_MICROSERVICE_URL: process.env.LOG_MICROSERVICE_URL,
  ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
};
