import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import dateFormat from 'src/utils/dateFormat';
import { debtGroupDto, debtGroupUpdateDto } from './debt-group.dto';
import { DebtGroupService } from './debt-group.service';

@Controller('debt-group')
export class DebtGroupController {
    constructor(private debtGroupService: DebtGroupService) {}

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getDebtsByUserId(@Param() params) {
        const id = parseInt(params.id);

        const result = await this.debtGroupService.fetch(id);
        if (!result) return null;

        return {
            ...result,
            createdat: dateFormat(`${result.createdat}`),
            updatedat: dateFormat(`${result.updatedat}`)
        }
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async createDebtGroup(@Body() debtGroupDto: debtGroupDto) {
        return await this.debtGroupService.create(debtGroupDto);
    }

    @Put()
    @UseFilters(new HttpExceptionFilter())
    async editDebtGroup(@Body() debtGroupUpdateDto: debtGroupUpdateDto){
        return this.debtGroupService.update(debtGroupUpdateDto);
    }

}
