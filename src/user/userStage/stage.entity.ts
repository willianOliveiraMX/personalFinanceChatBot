import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User_stage } from './userStage.entity';

@Entity("stage")
export class StageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  stageidentifier: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdat: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedat: string;

  @Column({ type: "boolean" })
  isvalid: boolean;
}
