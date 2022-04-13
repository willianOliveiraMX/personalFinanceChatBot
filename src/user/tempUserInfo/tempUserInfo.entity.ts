import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("temp_user_info")
export class Temp_user_info {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "json" })
  usertempdata: JSON;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;
}
