import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index('uniq_position_name', ['name'], { unique: true })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
