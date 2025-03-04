import { HttpStatusCode } from '../../../enums/http/http-status-codes.enum';

export interface IResponseManagerPort<T, K> {
  manageSuccess(
    promise: any,
    appResponse: T,
    statusCode: HttpStatusCode,
    message: string
  ): Promise<T>;
  manageException(error: K, appResponse: T): Promise<T>;
}
