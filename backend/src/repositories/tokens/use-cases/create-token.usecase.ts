import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Token } from '../../entities/token.entity';
import * as crypto from 'crypto';
import { TOKEN_LENGTH } from '../../../token/token.constants';

@Injectable()
export class CreateTokenUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    expiresIn: number,
    transactionManager?: EntityManager,
  ): Promise<Token> {
    const entityManager = transactionManager || this.globalEntityManager;

    const value = crypto.randomBytes(TOKEN_LENGTH).toString('hex');

    return entityManager.getRepository(Token).save({
      value,
      expiresIn: new Date(expiresIn).toISOString(),
    });
  }
}
