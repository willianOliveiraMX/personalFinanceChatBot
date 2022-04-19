import { Module } from '@nestjs/common';
import { IncomeModule } from 'src/income/income.module';
import { MonthreferenceModule } from 'src/monthreference/monthreference.module';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { DebtModule } from '../debt/debt.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    DebtModule, 
    IncomeModule,
    MonthreferenceModule
  ],
  controllers: [BalanceController],
  providers: [BalanceService, MonthreferenceService]
})
export class BalanceModule {}
