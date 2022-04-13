import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity("finance_user")
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  token: string;

  @Column({ default: true })
  isvalid: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;
}
