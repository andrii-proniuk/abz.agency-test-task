import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  constructor(body?: object) {
    super(
      {
        success: false,
        ...body,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
