import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tempUserInfo")
export class TempUserInfo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "json" })
  userTempData: JSON;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;
}
