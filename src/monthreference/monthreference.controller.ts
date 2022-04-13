import { Controller, Get, Post } from '@nestjs/common';
import { month_reference } from './monthreference.interface';
import { MonthreferenceService } from './monthreference.service';

@Controller('monthreference')
export class MonthreferenceController {
    constructor(private monthreferece: MonthreferenceService) {}

    @Get()
    async getMonthReference(): Promise<any>{
        return this.monthreferece.findByCurrentMonth();
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
