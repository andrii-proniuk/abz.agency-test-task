import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(body?: object) {
    super(
      {
        success: false,
        ...body,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
