import { Injectable } from '@nestjs/common';
import { IncomeService } from 'src/income/income.service';
import { DebtService } from '../debt/debt.service';

@Injectable()
export class BalanceService {

    constructor(private debtService: DebtService, private incomeService: IncomeService) {}

    getDebtByTokenAndMonth(token: string, monthid: number) {
        return this.debtService.getDebtByTokenAndMonthId(token, monthid);
    }

    getIncomeByUserIdAndMonth(token: string, monthid: number) {
        return this.incomeService.getIncomesByUserIdAndMonthId(token, monthid);
    }

}
