import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { currencyFormatIntToString, currencyFormatStringToInt } from 'src/utils/currencyFormat';
import { debtDto, debtDtoUpdate } from './debt.dto';
import { DebtService } from './debt.service';

@Controller('debt')
export class DebtController {
    constructor(private debtService: DebtService) {}

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() debtDto: debtDto) {
        return this.debtService.create({
            ...debtDto, 
            value: currencyFormatStringToInt({ value: debtDto.value }) 
        });
    }

    @Get(':userId/page/:pageNumber')
    @UseFilters(new HttpExceptionFilter())
    async getDebtsByUserId(@Param() params) {
        const userId = parseInt(params.userId);
        const pageNumber = parseInt(params.pageNumber);

        const result = await this.debtService.getDebtByUserId(userId, pageNumber);
        const reultedFormated = result.map(element => {
            return {
                ...element,
                value: currencyFormatIntToString({ value: element.value })
            }
        });
        return reultedFormated;
    }

    @Delete('remove/:id')
    @UseFilters(new HttpExceptionFilter())
    async deleteDebtById(@Param() params) {
        const debtId = parseInt(params.id);

        return this.debtService.deleteDebtById(debtId);
    }

    @Put('edit/:id')
    @UseFilters(new HttpExceptionFilter())
    async editDebtById(@Param() params, @Body() debtDto: debtDtoUpdate) {
        const debtId = parseInt(params.id);
        if (debtDto.value) {
            return this.debtService.updateDebtById({ 
                ...debtDto, 
                id: debtId, 
                 value: currencyFormatStringToInt({ value: debtDto.value }) 
            });
        } else {
            return this.debtService.updateDebtById({ ...debtDto, id: debtId, value: 0 });
        }
    }
}
