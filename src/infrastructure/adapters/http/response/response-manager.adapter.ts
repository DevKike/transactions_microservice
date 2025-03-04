import { Response } from 'express';
import { IResponseManagerPort } from '../../../../domain/ports/http/response/response-manager.port.interface';
import { HttpStatusCode } from '../../../../domain/enums/http/http-status-codes.enum';
import { CustomError } from '../../../../domain/exceptions/custom-error.exception';

export class ResponseManagerAdapter implements IResponseManagerPort<Response, CustomError> {
  constructor() {}

  async manageSuccess(
    promise: any,
    appResponse: Response<any, Record<string, any>>,
    statusCode: HttpStatusCode,
    message: string
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const result = await promise;

      return appResponse.status(statusCode).json({ message, data: result });
    } catch (error) {
      return appResponse
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  }

  async manageException(
    error: CustomError,
    appResponse: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    return appResponse.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
  }
}
