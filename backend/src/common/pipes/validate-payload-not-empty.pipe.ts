import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidatePayloadNotEmptyPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException({
        message: 'body is required',
      });
    }

    if (typeof value !== 'object') {
      throw new BadRequestException({
        message: 'body must be a JSON',
      });
    }

    return value;
  }
}
