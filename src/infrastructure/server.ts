import { IServerPort } from '../domain/ports/iserver.port';
import { container } from './inversify/config/inversify.config';
import { TYPES } from './inversify/types/inversify.types';

const server = container.get<IServerPort>(TYPES.Server);
server.start();