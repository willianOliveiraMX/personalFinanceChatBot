import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("debt_group")
export class debtGroupEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;

  @Column({ default: true })
  isvalid: boolean;
}
