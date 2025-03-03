import { Application } from 'express';
import { IServerPort } from '../domain/ports/server-port.interface';
import { container } from './inversify/config/inversify.config';
import { TYPES } from './inversify/types/inversify.types';

const server = container.get<IServerPort<Application>>(TYPES.Server);
server.start();
