import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';
import { ImagesModule } from '../images/images.module';
import { TokensRepositoryModule } from '../repositories/tokens/tokens-repository.module';
import { PositionsRepositoryModule } from '../repositories/positions/positions-repository.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import * as multer from 'multer';
import { MAX_USER_PHOTO_SIZE } from './users.constants';
import { ValidationFailedException } from '../common/exceptions/validation-failed.exception';

const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: MAX_USER_PHOTO_SIZE,
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/jpeg') {
      return callback(
        new ValidationFailedException({
          photo: ['accepted only image/jpeg mimetype for photo'],
        }),
      );
    }

    callback(null, true);
  },
});

@Module({
  imports: [
    UsersRepositoryModule,
    PositionsRepositoryModule,
    ImagesModule,
    TokensRepositoryModule,
    NestjsFormDataModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const customNext = (error?: any) => {
          console.log({ file: req.file, timestamp: new Date().toISOString() });
          if (!error) {
            return next();
          }

          if (
            error instanceof multer.MulterError &&
            error.code === 'LIMIT_FILE_SIZE'
          ) {
            return next(
              new ValidationFailedException({
                photo: ['photo file too large, max size - 5MB'],
              }),
            );
          }

          next(error);
        };

        upload.single('photo')(req, res, customNext);
      })
      .forRoutes({ path: '/users', method: RequestMethod.POST });
  }
}
