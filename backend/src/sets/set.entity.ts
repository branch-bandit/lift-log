import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SetType } from './set-type.model';

@Entity()
export class Set {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  set_type: SetType;
  @Column()
  date: Date;
  @Column()
  reps: number;
  @Column()
  weight: number;
  @Column({ nullable: true })
  failure_at: number;
}
