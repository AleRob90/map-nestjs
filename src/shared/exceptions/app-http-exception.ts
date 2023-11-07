import { HttpException } from '@nestjs/common';
import { IHttpError } from '../interfaces/http-error.interface';

export class AppHttpException extends HttpException {
  constructor(error: IHttpError) {
    super(error, error.code);
  }
}
