import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '@/domain/entities';

@Entity('users')
export class User implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'time without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time without time zone' })
  updatedAt: Date;
}
