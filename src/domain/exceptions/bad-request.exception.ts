import { HttpStatusCode } from '../enums/http/http-status-codes.enum';
import { CustomError } from './custom-error.exception';

export class BadRequestException extends CustomError {
  constructor(message: string) {
    super();
    this.name = 'BadRequestException';
    this.message = message;
    this.statusCode = HttpStatusCode.BAD_REQUEST;
  }
}
