import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from './position.entity';
import { TABLES } from '../../core/postgres/tables.constants';

@Entity(TABLES.USERS)
@Index('uniq_users_email', ['email'], { unique: true })
@Index('uniq_users_phone', ['phone'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  positionId: number;

  @ManyToOne(() => Position)
  @JoinColumn()
  position: Position;

  @CreateDateColumn()
  registrationTimestamp: number;

  @Column()
  photo: string;
}
