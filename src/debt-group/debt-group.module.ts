import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtGroupController } from './debt-group.controller';
import { debtGroupEntity } from './debt-group.entity';
import { DebtGroupService } from './debt-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([debtGroupEntity])],
  controllers: [DebtGroupController],
  providers: [DebtGroupService],
  exports: [TypeOrmModule]
})
export class DebtGroupModule {}
