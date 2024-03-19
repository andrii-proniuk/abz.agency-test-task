import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';
import {
  IValidationFails,
  ValidationFailedException,
} from './common/exceptions/validation-failed.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      console.log({
        path: req.path,
      });

      next();
    },
  );

  app.use('/public', express.static(join(process.cwd(), 'public')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        throw new ValidationFailedException(
          errors.reduce<IValidationFails>((acc, { property, constraints }) => {
            acc[property] = Object.values(constraints);

            return acc;
          }, {}),
        );
      },
    }),
  );

  const port = configService.get<number>('port');
  await app.listen(port);
}

bootstrap();
