import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { IncomeDto, IncomeUpdateDto } from './income.dto';
import { Income } from './income.interface';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
    constructor(private incomeService: IncomeService) {}

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    getIncome(@Param() params): Promise<Income[]> {
        const id = parseInt(params.id);
        return this.incomeService.getIncomesByUserId(id);
    }

    @Get('total/:id')
    @UseFilters(new HttpExceptionFilter())
    async getTotalIncome(@Param() params): Promise<any>{
        const id = parseInt(params.id);
        const result = await this.incomeService.getIncomesByUserId(id);
        if (!result) return { status: 'ok', message: 'no income has added'};

        const values = result.map(element => {
            return element.value;
        });

        const totalIncome = values.reduce((a, b) => { return a + b }, 0);

        return {
            status: 'ok',
            tatalIncome: totalIncome,
            incomeList: result,
        }
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    create(@Body() income: IncomeDto): Promise<Income> {
        return this.incomeService.create(income)
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
        return this.incomeService.update(income)
    }

}
