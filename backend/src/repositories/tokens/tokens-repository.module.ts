import { Module } from '@nestjs/common';
import { TokensRepositoryService } from './tokens-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { CreateTokenUseCase } from './use-cases/create-token.usecase';
import { GetTokenUseCase } from './use-cases/get-token.usecase';
import { DeleteTokenUseCase } from './use-cases/delete-token.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [
    TokensRepositoryService,
    CreateTokenUseCase,
    GetTokenUseCase,
    DeleteTokenUseCase,
  ],
  exports: [TokensRepositoryService],
})
export class TokensRepositoryModule {}
