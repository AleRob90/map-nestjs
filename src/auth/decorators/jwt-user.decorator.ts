import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
