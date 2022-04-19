import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("income")
export class IncomeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token_chatid: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  monthid: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;

  @Column({ default: true })
  isvalid: boolean;
}
