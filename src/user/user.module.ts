import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TempUserInfoModule } from './tempUserInfo/tempUserInfo.module';
import { TempUserService } from './tempUserInfo/tempUserInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TempUserInfoModule],
  controllers: [UserController],
  providers: [UserService, TempUserService],
  exports: [TypeOrmModule]
})
export class UserModule {}
