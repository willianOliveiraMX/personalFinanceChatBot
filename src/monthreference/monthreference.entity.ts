import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("month_reference")
export class MonthReferenceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  year: string;

  @Column()
  month: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;

  @Column({ default: true })
  isvalid: boolean;
}
