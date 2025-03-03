import { Application } from 'express';
import { IServerPort } from '../domain/ports/http/server-port.interface';
import { container } from './inversify/config/inversify.config';
import { TYPES } from './inversify/types/inversify.types';

const server = container.get<IServerPort<Application>>(
  TYPES.ExpressServerAdapter
);
server.start();
