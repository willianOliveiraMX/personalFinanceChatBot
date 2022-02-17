import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("monthReference")
export class MonthReferenceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  year: string;

  @Column()
  month: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;

  @Column({ default: true })
  isValid: boolean;
}
