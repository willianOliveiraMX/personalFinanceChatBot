import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { currencyFormatIntToString } from 'src/utils/currencyFormat';
import { dateFormatMonthYear } from 'src/utils/dateFormat';
import { totalDebtCalc, totalIncomeCalc } from 'src/utils/totalIncomeCalc';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {

    constructor(
        private balanceService: BalanceService,
        private monthreferenceService: MonthreferenceService
    ) {};

    @Get(':token')
    @UseFilters(new HttpExceptionFilter())
    async getBalanceByUserId(@Param() params) {
        const token = params.token;

        const actualMonth = await this.monthreferenceService.findByCurrentMonth();

        const allDebt = await this.balanceService.getDebtByTokenAndMonth(token, actualMonth.id);
        const allIncome = await this.balanceService.getIncomeByUserIdAndMonth(token, actualMonth.id);

        const resultCountIncome = totalIncomeCalc(allIncome);
        const resultCountDebt = totalDebtCalc(allDebt);

        return {
            balance: currencyFormatIntToString({ value: resultCountIncome - resultCountDebt }), 
            debtTotal: currencyFormatIntToString({ value: resultCountDebt}),
            incomeTotal: currencyFormatIntToString({ value: resultCountIncome}),
            month:  { 
                ...actualMonth, 
                createdat: dateFormatMonthYear(`${actualMonth.createdat}`)
            },
            token
        };
    }

}
