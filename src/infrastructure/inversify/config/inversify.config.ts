import { Container } from 'inversify';
import { TYPES } from '../types/inversify.types';
import { AppDataSource } from '../../database/config/typeorm.config';
import { IServerPort } from '../../../domain/ports/iserver.port';
import { ExpressServerAdapter } from '../../express/express-server.adapter';

const container = new Container();

container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

container.bind<IServerPort>(TYPES.Server).to(ExpressServerAdapter);

export { container };
