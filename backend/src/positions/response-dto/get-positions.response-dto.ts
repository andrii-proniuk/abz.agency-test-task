import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class PositionResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

@Exclude()
export class GetPositionsResponseDto {
  @Expose()
  success = true;

  @Expose()
  @Type(() => PositionResponseDto)
  positions: PositionResponseDto[];
}
