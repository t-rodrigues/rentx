import { SpecificationEntity } from '@/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('specifications')
export class Specification implements SpecificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date;
}
