import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { IncomeDto, IncomeUpdateDto } from './income.dto';
import { Income, IncomeFormated } from './income.interface';
import { IncomeService } from './income.service';
import { currencyFormatIntToString, currencyFormatStringToInt } from '../utils/currencyFormat';
import { totalIncomeCalc } from '../utils/totalIncomeCalc';
import dateFormat from 'src/utils/dateFormat';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';

@Controller('income')
export class IncomeController {
    constructor(
        private incomeService: IncomeService,
        private monthreferenceService: MonthreferenceService,
    ) {}

    @Get(':token')
    @UseFilters(new HttpExceptionFilter())
    async getTotalIncome(@Param() params): Promise<any>{
        const token = params.token;
        const result = await this.incomeService.getIncomesByUserToken(token);
        if (!result) return { status: 'ok', message: 'no income has added'};

        const totalIncome = totalIncomeCalc(result);

        const resultListFormated = result.map((element) => { return {
            ...element,
            value: currencyFormatIntToString({value: element.value }),
            createdat: dateFormat(`${element.createdat}`),
            updatedat: dateFormat(`${element.updatedat}`)
        }}); 

        return {
            status: 'ok',
            tatalIncome: currencyFormatIntToString({value: totalIncome }),
            incomeList: resultListFormated,
        }
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() income: IncomeDto): Promise<IncomeFormated> {
        const monthreference = await this.monthreferenceService.findByCurrentMonth();
        const formatedIncome = {
            token_chatid: income.token,
            description: income.description,
            monthid: monthreference.id,
            value: currencyFormatStringToInt({ value: income.value })
        };
        const incomeCreated = await this.incomeService.create(formatedIncome);
        return {
            description: incomeCreated.description,
            value: currencyFormatIntToString({ value: incomeCreated.value }),
            updatedat: incomeCreated.updatedat,
            isvalid: incomeCreated.isvalid
        };
    }

    @Delete(':id')
    @UseFilters(new HttpExceptionFilter())
    deleteIncome(@Param() params): Promise<Income[]> {
        const incomeId = parseInt(params.id);
        return this.incomeService.delete(incomeId);
    }

    @Put()
    @UseFilters(new HttpExceptionFilter())
    update(@Body() income: IncomeUpdateDto): Promise<Income> {
        return this.incomeService.update({ 
            ...income, 
            value: currencyFormatStringToInt({ 
                value: income.value 
            })
        });
    }

}
