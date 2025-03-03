import { HttpStatusCode } from '../enums/http/http-status-codes.enum';

export class CustomError extends Error {
  private statusCode: HttpStatusCode;
  constructor() {
    super();
    this.name = 'CustomError';
    this.message = 'An error occurred';
    this.statusCode = 500;
  }
}
