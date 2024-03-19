import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresqlConfigService } from './postgres-config.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresqlConfigService,
    }),
  ],
  providers: [PostgresqlConfigService, TransactionService],
  exports: [TransactionService],
})
export class PostgresModule {}
