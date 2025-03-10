import { LOCAL_ENVIRONMENT } from '../../infrastructure/environments/local.environment';

export const MICROSERVICES_URLS = {
  LOGGER: `${LOCAL_ENVIRONMENT.LOG_MICROSERVICE_URL}/api/log`,
};
