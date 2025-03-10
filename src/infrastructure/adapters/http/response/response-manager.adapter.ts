import { Response } from 'express';
import { IResponseManagerPort } from '../../../../domain/ports/http/response/response-manager.port.interface';
import { HttpStatusCode } from '../../../../domain/enums/http/http-status-codes.enum';
import { CustomError } from '../../../../domain/exceptions/custom-error.exception';
import { AlreadyExistsException } from '../../../../domain/exceptions/already-exists.exception';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';
import { SUCCESS_MESSAGES } from '../../../../domain/constants/success-messages.constant';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../inversify/types/inversify.types';
import { IHttpService } from '../../../services/logger/interfaces/http.service.interface';
import { ILogRequest } from '../../../services/logger/interfaces/log.request.interface';
import { LOCAL_ENVIRONMENT } from '../../../environments/local.environment';
import { BadRequestException } from '../../../../domain/exceptions/bad-request.exception';

@injectable()
export class ResponseManagerAdapter
  implements IResponseManagerPort<Response, CustomError>
{
  constructor(
    @inject(TYPES.HttpService) private readonly _httpService: IHttpService
  ) {}

  async manageResponse(
    promise: any,
    appResponse: Response<any, Record<string, any>>,
    type?: string,
    content?: string,
    statusCode?: HttpStatusCode,
    message?: string
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const result = await promise;

      await this._httpService.post<ILogRequest>(
        LOCAL_ENVIRONMENT.LOG_MICROSERVICE_URL!,
        {
          service: 'ACCOUNT_MICROSERVICE',
          type: type!,
          payload: result,
          content: content!,
        }
      );

      return appResponse
        .status(statusCode ? statusCode : HttpStatusCode.OK)
        .json({
          message: message ? message : SUCCESS_MESSAGES.OK,
          data: result,
        });
    } catch (error) {
      return await this.manageException(error as CustomError, appResponse);
    }
  }

  private async manageException(
    error: CustomError,
    appResponse: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    if (error instanceof NotFoundException) {
      await this._httpService.post<ILogRequest>(
        LOCAL_ENVIRONMENT.LOG_MICROSERVICE_URL!,
        {
          service: 'ACCOUNT_MICROSERVICE',
          type: 'ERROR',
          payload: error,
          content: 'Not found',
        }
      );

      return appResponse
        .status(error.statusCode)
        .json({ message: error.message });
    }

    if (error instanceof AlreadyExistsException) {
      await this._httpService.post<ILogRequest>(
        LOCAL_ENVIRONMENT.LOG_MICROSERVICE_URL!,
        {
          service: 'ACCOUNT_MICROSERVICE',
          type: 'ERROR',
          payload: error,
          content: 'Already exists',
        }
      );

      return appResponse
        .status(error.statusCode)
        .json({ message: error.message });
    }

    if (error instanceof BadRequestException) {
      await this._httpService.post<ILogRequest>(
        LOCAL_ENVIRONMENT.LOG_MICROSERVICE_URL!,
        {
          service: 'ACCOUNT_MICROSERVICE',
          type: 'ERROR',
          payload: error,
          content: 'Bad request',
        }
      );

      return appResponse
        .status(error.statusCode)
        .json({ message: error.message });
    }

    return appResponse
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
