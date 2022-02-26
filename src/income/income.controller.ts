import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { IncomeDto, IncomeUpdateDto } from './income.dto';
import { Income, IncomeFormated } from './income.interface';
import { IncomeService } from './income.service';
import { currencyFormatIntToString, currencyFormatStringToInt } from '../utils/currencyFormat';
import { totalIncomeCalc } from '../utils/totalIncomeCalc';

@Controller('income')
export class IncomeController {
    constructor(private incomeService: IncomeService) {}

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getTotalIncome(@Param() params): Promise<any>{
        const id = parseInt(params.id);
        const result = await this.incomeService.getIncomesByUserId(id);
        if (!result) return { status: 'ok', message: 'no income has added'};

        const totalIncome = totalIncomeCalc(result);

        const resultLIstFormated = result.map((element) => { return {
            ...element,
            value: currencyFormatIntToString({value: element.value })
        }}); 

        return {
            status: 'ok',
            tatalIncome: currencyFormatIntToString({value: totalIncome }),
            incomeList: resultLIstFormated,
        }
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() income: IncomeDto): Promise<IncomeFormated> {
        const formatedIncome = {
            ...income,
            value: currencyFormatStringToInt({ value: income.value })
        };
        const incomeCreated = await this.incomeService.create(formatedIncome);
        return {
            description: incomeCreated.description,
            value: currencyFormatIntToString({ value: incomeCreated.value }),
            userId: incomeCreated.userId,
            monthId: incomeCreated.userId,
            updatedAt: incomeCreated.updatedAt,
            isValid: incomeCreated.isValid
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
