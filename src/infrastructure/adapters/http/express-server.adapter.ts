import { inject, injectable } from 'inversify';
import express, { Application } from 'express';
import { LOCAL_ENVIRONMENT } from '../../environments/local.environment';
import { AppDataSource } from '../../database/config/typeorm.config';
import { IServerPort } from '../../../domain/ports/http/server-port.interface';
import { TYPES } from '../../inversify/types/inversify.types';
import { IRouterManagerPort } from '../../../domain/ports/http/routers/router-manager.port.interface';

@injectable()
export class ExpressServerAdapter implements IServerPort<Application> {
  private readonly _app: Application;
  private readonly _port: number;

  constructor(
    @inject(TYPES.RouterManagerAdapter)
    private readonly _routerManager: IRouterManagerPort<Application>
  ) {
    this._app = express();
    this._port = LOCAL_ENVIRONMENT.SERVER_PORT;
    this.initMiddlewares();
    this.initRoutes();
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

  private initRoutes(): void {
    this._routerManager.manageRoutes(this._app);
  }
}
