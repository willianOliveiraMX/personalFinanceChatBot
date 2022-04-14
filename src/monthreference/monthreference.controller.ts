import { Controller, Get, Post } from '@nestjs/common';
import { dateFormatMonthYear } from 'src/utils/dateFormat';
import { MonthreferenceService } from './monthreference.service';

@Controller('monthreference')
export class MonthreferenceController {
    constructor(private monthreferece: MonthreferenceService) {}

    @Get()
    async getMonthReference(): Promise<any>{
        const result = await this.monthreferece.findByCurrentMonth();
        if (!result) return null;

        return {
            ...result,
            createdat: dateFormatMonthYear(`${result.createdat}`)
        }
    }

    @Post()
    async create(): Promise<any>{
        const isAlreadyAdd = await this.monthreferece.findByCurrentMonth();
        if (isAlreadyAdd) { return {
            status: 'ok',
            message: 'current month is already add'
        } }; 

        await this.monthreferece.create();

        return {
            status: 'ok',
            message: 'current month and year has been created'
        }
    }
}
