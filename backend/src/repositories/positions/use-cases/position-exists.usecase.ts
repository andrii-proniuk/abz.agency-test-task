import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Position } from '../../entities/position.entity';

@Injectable()
export class PositionExistsUseCase {
  constructor(
    @InjectEntityManager() private globalEntityManager: EntityManager,
  ) {}

  async exec(
    whereOptions: FindOptionsWhere<Position>,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    const entityManager = transactionManager || this.globalEntityManager;

    return entityManager.getRepository(Position).existsBy(whereOptions);
  }
}
