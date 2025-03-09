import { Request, Response, Router } from 'express';
import { IRouterModulePort } from '../../../../../domain/ports/http/routers/router-module.port.interface';
import { IDepositMoneyUseCase } from '../../../../../domain/use-cases/transaction/deposit-money.use-case.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../inversify/types/inversify.types';
import { IResponseManagerPort } from '../../../../../domain/ports/http/response/response-manager.port.interface';
import { CustomError } from '../../../../../domain/exceptions/custom-error.exception';
import { HttpStatusCode } from '../../../../../domain/enums/http/http-status-codes.enum';
import { SUCCESS_MESSAGES } from '../../../../../domain/constants/success-messages.constant';
import { ClassValidatorMiddlewareFactory } from '../../middlewares/class-validator.middleware';
import { DepositMoneyReqDto } from '../../../../class-validator/dtos/transaction/deposit-money.req.dto';
import { container } from '../../../../inversify/config/inversify.config';

@injectable()
export class TransactionRouterAdapter implements IRouterModulePort<Router> {
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
    @inject(TYPES.DepositMoneyUseCase)
    private readonly _depositMoneyUseCase: IDepositMoneyUseCase
  ) {
    this._router = Router();
    this._classValidator = ClassValidatorMiddlewareFactory.create(container);
    this.initRoutes();
  }

  initRoutes(): void {
    this._router.post(
      '/deposit',
      this._classValidator(DepositMoneyReqDto),
      (req: Request, res: Response) => {
        this._responseManagerAdapter.manageResponse(
          this._depositMoneyUseCase.execute(req.body),
          res,
          HttpStatusCode.CREATED,
          SUCCESS_MESSAGES.CREATED
        );
      }
    );
  }

  getRouter() {
    return this._router;
  }
}
