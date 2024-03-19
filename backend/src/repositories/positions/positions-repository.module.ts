import { Module } from '@nestjs/common';
import { PositionsRepositoryService } from './positions-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { CreatePositionUseCase } from './use-cases/create-position.usecase';
import { PositionExistsUseCase } from './use-cases/position-exists.usecase';
import { GetPositionsUseCase } from './use-cases/get-positions.usecase';
import { CreatePositionsUseCase } from './use-cases/create-positions.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [
    PositionsRepositoryService,
    CreatePositionUseCase,
    CreatePositionsUseCase,
    PositionExistsUseCase,
    GetPositionsUseCase,
  ],
  exports: [PositionsRepositoryService],
})
export class PositionsRepositoryModule {}
