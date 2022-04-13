import { Injectable } from '@nestjs/common';
import { IncomeService } from 'src/income/income.service';
import { DebtService } from '../debt/debt.service';

@Injectable()
export class BalanceService {

    constructor(private debtService: DebtService, private incomeService: IncomeService) {}

    getDebtByUserAndMonth(userid: number, monthid: number) {
        return this.debtService.getDebtByUserIdAndMonthId(userid, monthid);
    }

    getIncomeByUserIdAndMonth(userid: number, monthid: number) {
        return this.incomeService.getIncomesByUserIdAndMonthId(userid, monthid);
    }

}
