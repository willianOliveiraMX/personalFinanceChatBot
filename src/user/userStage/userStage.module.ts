import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_stage } from './userStage.entity';
import { UserStageService } from './userStage.service';

@Module({
  imports: [TypeOrmModule.forFeature([User_stage])],
  providers: [UserStageService],
  exports: [TypeOrmModule]
})
export class UserStageModule {}
