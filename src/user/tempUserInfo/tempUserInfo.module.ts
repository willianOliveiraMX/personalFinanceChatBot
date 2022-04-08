import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempUserInfo } from './tempUserInfo.entity';
import { TempUserService } from './tempUserInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TempUserInfo])],
  providers: [TempUserService],
  exports: [TypeOrmModule]
})
export class TempUserInfoModule {}
