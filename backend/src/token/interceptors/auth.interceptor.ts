import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { TokensRepositoryService } from '../../repositories/tokens/tokens-repository.service';
import { InnerRequest } from '../../common/interfaces/inner-request.interface';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private tokensRepositoryService: TokensRepositoryService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<InnerRequest>();

    return next.handle().pipe(
      tap(() => {
        req.token && this.tokensRepositoryService.delete(req.token.id);
      }),
    );
  }
}
