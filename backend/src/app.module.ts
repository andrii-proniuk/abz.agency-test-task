import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { TokenModule } from './token/token.module';
import { PositionsModule } from './positions/positions.module';
import { SeederModule } from './seeder/seeder.module';
import { PublicModule } from './public/public.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    ImagesModule,
    TokenModule,
    PositionsModule,
    SeederModule,
    PublicModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
