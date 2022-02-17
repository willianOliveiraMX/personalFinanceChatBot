import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { IncomeDto } from './income.dto';
import { Income } from './income.interface';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
    constructor(private incomeService: IncomeService) {}

    @Post()
    @UseFilters(new HttpExceptionFilter())
    create(@Body() income: IncomeDto): Promise<Income> {
        return this.incomeService.create(income)
    }

}
