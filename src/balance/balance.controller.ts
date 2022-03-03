import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { currencyFormatIntToString } from 'src/utils/currencyFormat';
import { totalDebtCalc, totalIncomeCalc } from 'src/utils/totalIncomeCalc';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {

    constructor(private balanceService: BalanceService) {};

    @Get(':userId/month/:monthId')
    @UseFilters(new HttpExceptionFilter())
    async getBalanceByUserId(@Param() params) {
        const userId = parseInt(params.userId);
        const monthId = parseInt(params.monthId);

        const allDebt = await this.balanceService.getDebtByUserAndMonth(userId, monthId);
        const allIncome = await this.balanceService.getIncomeByUserIdAndMonth(userId, monthId);

        const resultCountIncome = totalIncomeCalc(allIncome);
        const resultCountDebt = totalDebtCalc(allDebt);

        return {
            balance: currencyFormatIntToString({ value: resultCountIncome - resultCountDebt }), 
            debtTotal: currencyFormatIntToString({ value: resultCountDebt}),
            incomeTotal: currencyFormatIntToString({ value: resultCountIncome}),
            monthId,
            userId
        };
    }

}
