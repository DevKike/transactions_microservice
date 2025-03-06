import { HttpStatusCode } from '../enums/http/http-status-codes.enum';
import { CustomError } from './custom-error.exception';

export class NotFoundException extends CustomError {
  constructor(message: string) {
    super();
    this.name = 'NotFoundException';
    this.message = message;
    this.statusCode = HttpStatusCode.NOT_FOUND;
  }
}
