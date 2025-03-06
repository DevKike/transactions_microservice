import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';
import { IResponseManagerPort } from '../../../../domain/ports/http/response/response-manager.port.interface';
import { TYPES } from '../../../inversify/types/inversify.types';

export class ClassValidatorMiddlewareFactory {
  static create(container: Container) {
    return (DtoClass: any) => {
      return async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const responseManager = container.get<
          IResponseManagerPort<Response, ValidationError>
        >(TYPES.ResponseManagerAdapter);

        const dtoInstance = Object.assign(new DtoClass(), req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
          responseManager.manageResponse(errors[0], res);
          return;
        }

        next();
      };
    };
  }
}
