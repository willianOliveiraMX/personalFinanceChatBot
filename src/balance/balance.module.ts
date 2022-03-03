import { Module } from '@nestjs/common';
import { IncomeModule } from 'src/income/income.module';
import { DebtModule } from '../debt/debt.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [DebtModule, IncomeModule],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
