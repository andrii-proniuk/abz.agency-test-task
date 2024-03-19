import { UnprocessableEntityException } from './unprocessable-entity.exception';

export interface IValidationFails {
  [property: string]: string[];
}

export class ValidationFailedException extends UnprocessableEntityException {
  constructor(fails: IValidationFails) {
    super({
      success: false,
      message: 'Validation failed',
      fails,
    });
  }
}
