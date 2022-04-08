import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("userStage")
export class UserStage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: "int" })
  stageId: number;

  @Column({ type: "int" })
  tempUserId: number;

  @Column({ type: "varchar" })
  tokenChatId: String;
}
