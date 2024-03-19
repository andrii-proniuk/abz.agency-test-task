import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(body?: object) {
    super(
      {
        success: false,
        ...body,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
