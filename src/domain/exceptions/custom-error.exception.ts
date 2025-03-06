import { HttpStatusCode } from '../enums/http/http-status-codes.enum';

export abstract class CustomError extends Error {
  public statusCode: HttpStatusCode;
  constructor() {
    super();
    this.name = 'CustomError';
    this.message = 'An error occurred';
    this.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
