import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { currencyFormatIntToString } from 'src/utils/currencyFormat';
import { totalDebtCalc, totalIncomeCalc } from 'src/utils/totalIncomeCalc';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {

    constructor(private balanceService: BalanceService) {};

    @Get(':userid/month/:monthid')
    @UseFilters(new HttpExceptionFilter())
    async getBalanceByUserId(@Param() params) {
        const userid = parseInt(params.userid);
        const monthid = parseInt(params.monthid);

        const allDebt = await this.balanceService.getDebtByUserAndMonth(userid, monthid);
        const allIncome = await this.balanceService.getIncomeByUserIdAndMonth(userid, monthid);

        const resultCountIncome = totalIncomeCalc(allIncome);
        const resultCountDebt = totalDebtCalc(allDebt);

        return {
            balance: currencyFormatIntToString({ value: resultCountIncome - resultCountDebt }), 
            debtTotal: currencyFormatIntToString({ value: resultCountDebt}),
            incomeTotal: currencyFormatIntToString({ value: resultCountIncome}),
            monthid,
            userid
        };
    }

}
