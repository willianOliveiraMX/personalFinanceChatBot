import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StageEntity } from './stage.entity';

@Entity("user_stage")
export class User_stage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "int" })
  stageid: number;

  @Column({ type: "int" })
  temp_userid: number;

  @Column({ type: "varchar" })
  token_chatid: String;
}
