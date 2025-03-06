import { HttpStatusCode } from '../../../enums/http/http-status-codes.enum';

export interface IResponseManagerPort<T, K> {
  manageResponse(
    promise: any,
    appResponse: T,
    statusCode?: HttpStatusCode,
    message?: string
  ): Promise<T>;
}
