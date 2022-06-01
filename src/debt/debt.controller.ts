import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpExceptionFilter } from 'src/filters/http-filter';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { currencyFormatIntToString, currencyFormatStringToInt } from 'src/utils/currencyFormat';
import dateFormat from 'src/utils/dateFormat';
import { debtDto, debtDtoUpdate } from './debt.dto';
import { DebtService } from './debt.service';
import { DebtGroupService } from 'src/debt-group/debt-group.service';
import { UserService } from 'src/user/user.service';

@Controller('debt')
export class DebtController {
    constructor(
        private debtService: DebtService,
        private monthreferenceService: MonthreferenceService,
        private debtGroupService: DebtGroupService,
        private userService: UserService,
    ) {}

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() debtDto: debtDto) {
        const monthreference = await this.monthreferenceService.findByCurrentMonth();
        const debtGroup = await this.debtGroupService.fetchByDescription(debtDto.description);

        return this.debtService.create({
            value: currencyFormatStringToInt({ value: debtDto.value }),
            token_chatid: debtDto.token,
            monthid: monthreference.id,
            groupid: debtGroup ? debtGroup.id : parseInt(debtDto.groupid),
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

    @Cron('* 0 * * *')
    @UseFilters(new HttpExceptionFilter())
    async createGroupsByDebts() {
        const getGroups = (debts) => {
            const newDebts = [];
            debts.forEach((element) => {
                const isAdd = newDebts.find(
                    (newDebt) => newDebt === element.description.toLowerCase()
                );
                if (!isAdd) {
                    newDebts.push(element.description.toLowerCase().replace(" ", ""));
                }
            });
            return newDebts;
        };

        const usersList = await this.userService.findAllValid();
        if(!usersList.length) return;

        const monthreference = await this.monthreferenceService.findByCurrentMonth();

        usersList.forEach(async user => {
            const token = user.token;
    
            const debtsBytoken = await this.debtService.getDebtsByTokenId(token, monthreference.id);
            const descriptionGroups = getGroups(debtsBytoken);

            if (descriptionGroups.length) {
                descriptionGroups.forEach(async description => {
                    const isAddGroup = await this.debtGroupService.fetchByDescription(description);
                    if (isAddGroup) return;
                    const debtGroup = await this.debtGroupService.create({ 
                        description,
                        token_chatid: token,
                    });

                    debtsBytoken.forEach(async debt => {
                        if (debt.description
                            .toLowerCase()
                            .replace(' ', '') 
                            === 
                            debtGroup.description
                        ) {
                            await this.debtService.updateDebtById({
                                groupid: debtGroup.id,
                                id: debt.id
                            });
                        }
                    })
                    
                })
            }
        });
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
