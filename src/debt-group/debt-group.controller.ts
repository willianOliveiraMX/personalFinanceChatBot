import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { debtGroupDto, debtGroupUpdateDto } from './debt-group.dto';
import { DebtGroupService } from './debt-group.service';

@Controller('debt-group')
export class DebtGroupController {
    constructor(private debtGroupService: DebtGroupService) {}

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getDebtsByUserId(@Param() params) {
        const id = parseInt(params.id);

        return await this.debtGroupService.fetch(id);
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
