import { Container } from 'inversify';
import { DataSource } from 'typeorm';
import { TYPES } from '../types/inversify.types';
import { AppDataSource } from '../../database/config/typeorm.config';
import { IServerPort } from '../../../domain/ports/http/server-port.interface';
import { Application, Response, Router } from 'express';
import { ExpressServerAdapter } from '../../adapters/http/express-server.adapter';
import { IAccountService } from '../../../domain/services/account/account-service.interface';
import { AccountService } from '../../services/account/account.service';
import { ICreateAccountUseCase } from '../../../domain/use-cases/account/create-account.use-case.interface';
import { CreateAccountUseCase } from '../../../application/use-cases/account/create-account.use-case';
import { RouterManagerAdapter } from '../../adapters/http/driving/router-manager.adapter';
import { IRouterManagerPort } from '../../../domain/ports/http/routers/router-manager.port.interface';
import { IRouterModulePort } from '../../../domain/ports/http/routers/router-module.port.interface';
import { AccountRouterAdapter } from '../../adapters/http/driving/account/account-router.adapter';
import { IResponseManagerPort } from '../../../domain/ports/http/response/response-manager.port.interface';
import { ResponseManagerAdapter } from '../../adapters/http/response/response-manager.adapter';
import { CustomError } from '../../../domain/exceptions/custom-error.exception';

const container = new Container();

container.bind<DataSource>(TYPES.DataSource).toConstantValue(AppDataSource);

container
  .bind<IServerPort<Application>>(TYPES.ExpressServerAdapter)
  .to(ExpressServerAdapter);
container
  .bind<IRouterManagerPort<Application>>(TYPES.RouterManagerAdapter)
  .to(RouterManagerAdapter);
container
  .bind<IResponseManagerPort<Response, CustomError>>(
    TYPES.ResponseManagerAdapter
  )
  .to(ResponseManagerAdapter);

container.bind<IAccountService>(TYPES.AccountService).to(AccountService);

container
  .bind<ICreateAccountUseCase>(TYPES.CreateAccountUseCase)
  .toDynamicValue((context) => {
    const accountService = context.get<IAccountService>(TYPES.AccountService);
    return new CreateAccountUseCase(accountService);
  });
container
  .bind<IRouterModulePort<Router>>(TYPES.AccountRouterAdapter)
  .to(AccountRouterAdapter);

export { container };
