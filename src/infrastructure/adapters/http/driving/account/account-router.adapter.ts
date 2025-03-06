import { Response, Router } from 'express';
import { IRouterModulePort } from '../../../../../domain/ports/http/routers/router-module.port.interface';
import { inject, injectable } from 'inversify';
import { ICreateAccountUseCase } from '../../../../../domain/use-cases/account/create-account.use-case.interface';
import { TYPES } from '../../../../inversify/types/inversify.types';
import { IResponseManagerPort } from '../../../../../domain/ports/http/response/response-manager.port.interface';
import { HttpStatusCode } from '../../../../../domain/enums/http/http-status-codes.enum';
import { SUCCESS_MESSAGES } from '../../../../../domain/constants/success-messages.constant';
import { CustomError } from '../../../../../domain/exceptions/custom-error.exception';
import { AccountCreateReqDto } from '../../../../class-validator/dtos/req/account-create.req.dto';
import { ClassValidatorMiddlewareFactory } from '../../middlewares/class-validator.middleware';
import { container } from '../../../../inversify/config/inversify.config';

@injectable()
export class AccountRouterAdapter implements IRouterModulePort<Router> {
  private readonly _router: Router;
  private readonly _classValidator: ReturnType<
    typeof ClassValidatorMiddlewareFactory.create
  >;

  constructor(
    @inject(TYPES.ResponseManagerAdapter)
    private readonly _responseManagerAdapter: IResponseManagerPort<
      Response,
      CustomError
    >,
    @inject(TYPES.CreateAccountUseCase)
    private readonly _createAccountUseCase: ICreateAccountUseCase
  ) {
    this._router = Router();
    this._classValidator = ClassValidatorMiddlewareFactory.create(container);
    this.initRoutes();
  }

  initRoutes(): void {
    this._router.post(
      '/account',
      this._classValidator(AccountCreateReqDto),
      (req, res) => {
        this._responseManagerAdapter.manageSuccess(
          this._createAccountUseCase.execute(req.body),
          res,
          HttpStatusCode.CREATED,
          SUCCESS_MESSAGES.CREATED
        );
      }
    );
  }

  getRouter(): Router {
    return this._router;
  }
}
