import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { TimeoutInterceptor } from '../interceptors/timeout.interceptor';

const SetTimeout = (timeout: number) => SetMetadata('request-timeout', timeout);

export function SetRequestTimeout(timeout?: number) {
  return applyDecorators(
    SetTimeout(timeout),
    UseInterceptors(TimeoutInterceptor),
  );
}
