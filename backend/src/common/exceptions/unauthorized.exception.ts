import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
