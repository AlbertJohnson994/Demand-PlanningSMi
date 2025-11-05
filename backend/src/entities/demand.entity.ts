import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DemandStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

@Entity('demands')
export class Demand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  sku!: string;

  @Column('text', { default: '' }) // Make optional with default
  description!: string;

  @Column('date')
  startDate!: Date;

  @Column('date')
  endDate!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPlanned!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalProduction!: number;

  @Column({
    type: 'text',
    enum: DemandStatus,
    default: DemandStatus.PLANNING,
  })
  status!: DemandStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
