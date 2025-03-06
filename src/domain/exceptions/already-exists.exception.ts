import { HttpStatusCode } from '../enums/http/http-status-codes.enum';
import { CustomError } from './custom-error.exception';

export class AlreadyExistsException extends CustomError {
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'AlreadyExistsException';
    this.statusCode = HttpStatusCode.CONFLICT;
  }
}
