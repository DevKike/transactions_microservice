import { Router } from 'express';
import { IRouterModulePort } from '../../../../../domain/ports/http/router-module.port.interface';
import { HttpStatusCode } from '../../../../../domain/enums/http/http-status-codes.enum';
import { injectable } from 'inversify';

@injectable()
export class AccountRouterAdapter implements IRouterModulePort<Router> {
  private readonly _router: Router;
  constructor() {
    this._router = Router();
    this.initRoutes();
  }

  initRoutes(): void {
    this._router.post('/account', (req, res) => {
      res
        .status(HttpStatusCode.CREATED)
        .send({ message: 'Account created with success!' });
    });
  }

  getRouter(): Router {
    return this._router;
  }
}
