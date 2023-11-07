import { HttpStatus } from '@nestjs/common';

export interface IHttpError {
  message: string;
  code: HttpStatus;
}
