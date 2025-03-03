import { Container } from 'inversify';
import { TYPES } from '../types/inversify.types';
import { AppDataSource } from '../../database/config/typeorm.config';
import { IServerPort } from '../../../domain/ports/server-port.interface';
import { ExpressServerAdapter } from '../../express/express-server.adapter';
import { Application } from 'express';

const container = new Container();

container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

container.bind<IServerPort<Application>>(TYPES.Server).to(ExpressServerAdapter);

export { container };
