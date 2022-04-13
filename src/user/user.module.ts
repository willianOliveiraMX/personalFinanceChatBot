import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TempUserInfoModule } from './tempUserInfo/tempUserInfo.module';
import { TempUserService } from './tempUserInfo/tempUserInfo.service';
import { UserStageModule } from './userStage/userStage.module';
import { UserStageService } from './userStage/userStage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserStageModule,
    TempUserInfoModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserStageService,
    TempUserService,
  ],
  exports: [TypeOrmModule]
})
export class UserModule {}
