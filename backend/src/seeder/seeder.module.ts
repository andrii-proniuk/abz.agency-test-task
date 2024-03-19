import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { PositionsRepositoryModule } from '../repositories/positions/positions-repository.module';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [PositionsRepositoryModule, UsersRepositoryModule, ImagesModule],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
