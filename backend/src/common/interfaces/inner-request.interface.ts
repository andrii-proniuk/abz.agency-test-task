import { Request } from 'express';
import { Token } from '../../repositories/entities/token.entity';

export interface InnerRequest extends Request {
  token?: Token;
}
