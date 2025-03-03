import { injectable } from 'inversify';
import express, { Application } from 'express';
import { LOCAL_ENVIRONMENT } from '../environments/local.environment';
import { AppDataSource } from '../database/config/typeorm.config';
import { IServerPort } from '../../domain/ports/server-port.interface';

@injectable()
export class ExpressServerAdapter implements IServerPort<Application> {
  private readonly _app: Application;
  private readonly _port: number;

  constructor() {
    this._app = express();
    this._port = LOCAL_ENVIRONMENT.SERVER_PORT;
    this.initMiddlewares();
  }

  public async start(): Promise<void> {
    this._app.listen(this._port, async () => {
      try {
        await AppDataSource.initialize();
        console.log(`Data source initialized with success!`);
        console.log(`Server running on http://localhost:${this._port}`);
      } catch (error) {
        console.error('An error occurred', error);
        process.exit(1);
      }
    });
  }

  getHttpServer(): express.Application {
    return this._app;
  }

  private initMiddlewares(): void {
    this._app.use(express.json());
  }
}
