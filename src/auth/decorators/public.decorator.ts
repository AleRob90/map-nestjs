import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Use @Public decorator for endpoints which aren't restricted to non-authenticated users
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
