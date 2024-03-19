import { Module } from '@nestjs/common';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { PositionsRepositoryModule } from '../repositories/positions/positions-repository.module';

@Module({
  imports: [PositionsRepositoryModule],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
