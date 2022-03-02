import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("debtGroup")
export class debtGroupEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;

  @Column({ default: true })
  isValid: boolean;
}
