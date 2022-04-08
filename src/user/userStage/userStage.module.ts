import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStage } from './userStage.entity';
import { UserStageService } from './userStage.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStage])],
  providers: [UserStageService],
  exports: [TypeOrmModule]
})
export class TempUserInfoModule {}
