import { Injectable } from '@nestjs/common';
import { CreatePositionUseCase } from './use-cases/create-position.usecase';
import { PositionExistsUseCase } from './use-cases/position-exists.usecase';
import { EntityManager } from 'typeorm';
import { Position } from '../entities/position.entity';
import { GetPositionsUseCase } from './use-cases/get-positions.usecase';
import { CreatePositionsUseCase } from './use-cases/create-positions.usecase';

@Injectable()
export class PositionsRepositoryService {
  constructor(
    private createPositionUseCase: CreatePositionUseCase,
    private createPositionsUseCase: CreatePositionsUseCase,
    private positionExistsUseCase: PositionExistsUseCase,
    private getPositionsUseCase: GetPositionsUseCase,
  ) {}

  async create(
    name: string,
    transactionManager?: EntityManager,
  ): Promise<Position> {
    return this.createPositionUseCase.exec(name, transactionManager);
  }

  async createMany(
    names: string[],
    transactionManager?: EntityManager,
  ): Promise<Position[]> {
    return this.createPositionsUseCase.exec(names, transactionManager);
  }

  async existsById(
    id: number,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.positionExistsUseCase.exec({ id }, transactionManager);
  }

  async existsByName(
    name: string,
    transactionManager?: EntityManager,
  ): Promise<boolean> {
    return this.positionExistsUseCase.exec({ name }, transactionManager);
  }

  async getAll(transactionManager?: EntityManager): Promise<Position[]> {
    return this.getPositionsUseCase.exec(transactionManager);
  }
}
