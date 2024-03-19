import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Token } from '../../entities/token.entity';

@Injectable()
export class GetTokenUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    value: string,
    transactionManager?: EntityManager,
  ): Promise<Token> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Token).findOneBy({ value });
  }
}
