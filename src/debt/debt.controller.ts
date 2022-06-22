import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { currencyFormatIntToString, currencyFormatStringToInt } from 'src/utils/currencyFormat';
import dateFormat from 'src/utils/dateFormat';
import { debtDto, debtDtoUpdate } from './debt.dto';
import { DebtService } from './debt.service';
import { DebtGroupService } from 'src/debt-group/debt-group.service';

@Controller('debt')
export class DebtController {
    constructor(
        private debtService: DebtService,
        private monthreferenceService: MonthreferenceService,
        private debtGroupService: DebtGroupService,
    ) {}

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() debtDto: debtDto) {
        const monthreference = await this.monthreferenceService.findByCurrentMonth();
        const validDescription = debtDto.description
            .toLowerCase()
            .replace(' ', '');

        const debtGroup = await this.debtGroupService.fetchByDescription(validDescription, debtDto.token);

        let newDebtGroup = null;

        if (!debtGroup && !debtDto.groupid) {
            newDebtGroup = await this.debtGroupService.create({
                description: validDescription,
                token_chatid: debtDto.token
            });
        }

        const currentDebtGroup = debtGroup 
        ? debtGroup.id 
        : (debtDto.groupid ? parseInt(debtDto.groupid) : newDebtGroup.id);

        return this.debtService.create({
            value: currencyFormatStringToInt({ value: debtDto.value }),
            token_chatid: debtDto.token,
            monthid: monthreference.id,
            groupid: currentDebtGroup,
            description: debtDto.description,
            installmentTotal: parseInt(debtDto.installmentTotal),
            dateToPay: debtDto.dateToPay,
            isalreadypay: Boolean(debtDto.isalreadypay),
        });
    }

    @Get(':token/page/:pageNumber')
    @UseFilters(new HttpExceptionFilter())
    async getDebtsByUserId(@Param() params, @Query() query) {
        const token = params.token;
        const pageNumber = parseInt(params.pageNumber);
        const monthid = parseInt(query.monthid);

        const result = await this.debtService.getDebtByUserToken(token, pageNumber, monthid);
        const reultedFormated = result.map(element => {
            return {
                ...element,
                dateToPay: dateFormat(`${element.dateToPay}`),
                value: currencyFormatIntToString({ value: element.value }),
                createdat: dateFormat(`${element.createdat}`),
                updatedat: dateFormat(`${element.updatedat}`),
            }
        });
        return reultedFormated;
    }

    @Delete('remove/:id/:token')
    @UseFilters(new HttpExceptionFilter())
    async deleteDebtById(@Param() params) {
        const debtId = parseInt(params.id);
        const token = params.token;

        return this.debtService.deleteDebtById(debtId, token);
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
