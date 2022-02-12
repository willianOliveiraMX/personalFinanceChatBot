import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity("user")
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  token: string;

  @Column({ default: true })
  isValid: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;
}
