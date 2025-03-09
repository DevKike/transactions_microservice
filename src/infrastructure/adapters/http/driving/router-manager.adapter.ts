import { Application, Router } from 'express';
import { IRouterManagerPort } from '../../../../domain/ports/http/routers/router-manager.port.interface';
import { inject, injectable } from 'inversify';
import { IRouterModulePort } from '../../../../domain/ports/http/routers/router-module.port.interface';
import { TYPES } from '../../../inversify/types/inversify.types';

@injectable()
export class RouterManagerAdapter implements IRouterManagerPort<Application> {
  private readonly API_PREFIX = '/api';
  constructor(
    @inject(TYPES.AccountRouterAdapter)
    private readonly _accountRouter: IRouterModulePort<Router>,
  ) {}

  manageRoutes(application: Application): void {
    application.use(
      `${this.API_PREFIX}/account`,
      this._accountRouter.getRouter()
    );
  }
}
