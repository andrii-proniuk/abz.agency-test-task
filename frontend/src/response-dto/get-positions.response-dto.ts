import { PositionResponseDto } from './position.response-dto';

export interface GetPositionsResponseDto {
  success: boolean;
  positions: PositionResponseDto[];
}
