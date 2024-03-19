import { Injectable } from '@nestjs/common';
import { CreateTokenUseCase } from './use-cases/create-token.usecase';
import { GetTokenUseCase } from './use-cases/get-token.usecase';
import { EntityManager } from 'typeorm';
import { Token } from '../entities/token.entity';
import { DeleteTokenUseCase } from './use-cases/delete-token.usecase';

@Injectable()
export class TokensRepositoryService {
  constructor(
    private createTokenUseCase: CreateTokenUseCase,
    private getTokenUseCase: GetTokenUseCase,
    private deleteTokenUseCase: DeleteTokenUseCase,
  ) {}

  async create(
    expiresIn: number,
    transactionManager?: EntityManager,
  ): Promise<Token> {
    return this.createTokenUseCase.exec(expiresIn, transactionManager);
  }

  async getByValue(
    value: string,
    transactionManager?: EntityManager,
  ): Promise<Token> {
    return this.getTokenUseCase.exec(value, transactionManager);
  }

  async delete(id: number, transactionManager?: EntityManager): Promise<void> {
    return this.deleteTokenUseCase.exec(id, transactionManager);
  }
}
