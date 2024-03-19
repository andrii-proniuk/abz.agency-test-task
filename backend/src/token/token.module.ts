import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { TokensRepositoryModule } from '../repositories/tokens/tokens-repository.module';

@Module({
  imports: [TokensRepositoryModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
