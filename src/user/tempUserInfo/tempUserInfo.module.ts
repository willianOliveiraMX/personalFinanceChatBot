import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temp_user_info } from './tempUserInfo.entity';
import { TempUserService } from './tempUserInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Temp_user_info])],
  providers: [TempUserService],
  exports: [TypeOrmModule]
})
export class TempUserInfoModule {}
