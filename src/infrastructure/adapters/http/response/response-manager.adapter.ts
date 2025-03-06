import { Response } from 'express';
import { IResponseManagerPort } from '../../../../domain/ports/http/response/response-manager.port.interface';
import { HttpStatusCode } from '../../../../domain/enums/http/http-status-codes.enum';
import { CustomError } from '../../../../domain/exceptions/custom-error.exception';
import { AlreadyExistsException } from '../../../../domain/exceptions/already-exists.exception';
import { NotFoundException } from '../../../../domain/exceptions/not-found.exception';
import { SUCCESS_MESSAGES } from '../../../../domain/constants/success-messages.constant';

export class ResponseManagerAdapter
  implements IResponseManagerPort<Response, CustomError>
{
  constructor() {}

  async manageResponse(
    promise: any,
    appResponse: Response<any, Record<string, any>>,
    statusCode?: HttpStatusCode,
    message?: string
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const result = await promise;

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
      return appResponse
        .status(error.statusCode)
        .json({ message: error.message });
    }

    if (error instanceof AlreadyExistsException) {
      return appResponse
        .status(error.statusCode)
        .json({ message: error.message });
    }

    return appResponse
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
