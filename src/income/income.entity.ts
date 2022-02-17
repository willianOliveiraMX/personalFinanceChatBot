import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("income")
export class IncomeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  monthId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;

  @Column({ default: true })
  isValid: boolean;
}
