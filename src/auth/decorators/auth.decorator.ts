import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Auth(): (target: object, propertyKey: string) => void {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
