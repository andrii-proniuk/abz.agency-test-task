import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseConfig } from '../../config/configuration.types';

@Injectable()
export class PostgresqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, port, username, password, database } =
      this.configService.get<DatabaseConfig>('database');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: ['dist/repositories/entities/**/*.entity.js'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
