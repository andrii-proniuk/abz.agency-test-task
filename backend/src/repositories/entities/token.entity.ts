import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TABLES } from '../../core/postgres/tables.constants';

@Entity(TABLES.TOKENS)
@Index('uniq_token_value', ['value'], { unique: true })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ type: 'timestamp' })
  expiresIn: string;
}
