import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("debt")
export class debtEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

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
  groupId: number;
  
  @Column()
  monthId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;

  @Column({ default: true })
  isValid: boolean;
}
