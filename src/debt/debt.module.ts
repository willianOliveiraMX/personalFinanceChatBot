import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtController } from './debt.controller';
import { debtEntity } from './debt.entity';
import { DebtService } from './debt.service';

@Module({
  imports: [TypeOrmModule.forFeature([debtEntity])],
  controllers: [DebtController],
  providers: [DebtService, DebtService],
  exports: [TypeOrmModule, DebtService]
})
export class DebtModule {}
