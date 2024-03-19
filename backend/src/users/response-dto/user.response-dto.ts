import { Expose, Transform } from 'class-transformer';
import { Position } from '../../repositories/entities/position.entity';

@Expose()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  @Transform(({ value }: { value: Position }) => value.name)
  position: string;

  @Expose({ name: 'positionId' })
  position_id: number;

  @Expose({ name: 'registrationTimestamp' })
  registration_timestamp: number;

  @Expose()
  photo: string;
}
