import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("debt")
export class debtEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token_chatid: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  installmentTotal: number;

  @Column()
  installmentCurrent: number;

  @Column({ type: "timestamp" })
  dateToPay: string;

  @Column()
  isalreadypay: boolean;

  @Column()
  groupid: number;
  
  @Column()
  monthid: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;

  @Column({ default: true })
  isvalid: boolean;
}
