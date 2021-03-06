import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { MonthReferenceEntity } from './monthreference.entity';
import { month_reference } from './monthreference.interface';
import { monthsName } from './utils';

@Injectable()
export class MonthreferenceService {
    constructor(
        @InjectRepository(MonthReferenceEntity)
        private readonly monthReferenceRepository: Repository<month_reference>
    ){}

    @Cron('1 0 1-31 * *')
    async handleCron() {
        const isAlreadyAdd = await this.findByCurrentMonth();
        if (isAlreadyAdd) return;
        this.create();
    }

    async findByCurrentMonth() {
        const currentDate = new Date();
        const result = await this.monthReferenceRepository.findOne(
            {
                where: {
                    year: `${currentDate.getFullYear()}`,
                    month: `${currentDate.getMonth()}`,
                }
            }
        );
        
        if (!result) {
            const newMonthCreated = await this.create();

            return {
                id: newMonthCreated.id,
                year: newMonthCreated.year,
                month: newMonthCreated[parseInt(result.month)],
                monthNumber: parseInt(newMonthCreated.month),
                createdat: newMonthCreated.createdat
            }
        }

        return {
            id: result.id,
            year: result.year,
            month: monthsName[parseInt(result.month)],
            monthNumber: parseInt(result.month),
            createdat: result.createdat
        }
    }

    create(): Promise<month_reference> {
        const currentDate = new Date();
        return this.monthReferenceRepository.save({  
            year: `${currentDate.getFullYear()}`,
            month: `${currentDate.getMonth()}`,
            updatedat: currentDate,
            createdat: currentDate,
        });
    }
}
