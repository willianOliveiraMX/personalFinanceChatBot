import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeController } from './income.controller';
import { IncomeEntity } from './income.entity';
import { IncomeService } from './income.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity])],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [TypeOrmModule, IncomeService]
})
export class IncomeModule {}
