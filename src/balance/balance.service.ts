import { Injectable } from '@nestjs/common';
import { IncomeService } from 'src/income/income.service';
import { DebtService } from '../debt/debt.service';

@Injectable()
export class BalanceService {

    constructor(private debtService: DebtService, private incomeService: IncomeService) {}

    getDebtByUserAndMonth(userId: number, monthId: number) {
        return this.debtService.getDebtByUserIdAndMonthId(userId, monthId);
    }

    getIncomeByUserIdAndMonth(userId: number, monthId: number) {
        return this.incomeService.getIncomesByUserIdAndMonthId(userId, monthId);
    }

}
