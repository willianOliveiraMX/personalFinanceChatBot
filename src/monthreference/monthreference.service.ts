import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthReferenceEntity } from './monthreference.entity';
import { monthreference } from './monthreference.interface';
import { monthsName } from './utils';

@Injectable()
export class MonthreferenceService {
    constructor(
        @InjectRepository(MonthReferenceEntity)
        private readonly monthReferenceRepository: Repository<monthreference>
    ){}

    async findByCurrentMonth() {
        const currentDate = new Date();
        const result = await this.monthReferenceRepository.findOne(
            { 
                where: { 
                    year: `${currentDate.getFullYear()}`,
                    month: `${currentDate.getMonth()}`,
                } 
            });
        
        if (!result) return null;

        return {
            year: result.year,
            month: monthsName[parseInt(result.month)],
            monthNumber: parseInt(result.month),
            createdAt: result.createdAt
        }
    }

    create(): Promise<monthreference> {
        const currentDate = new Date();
        return this.monthReferenceRepository.save({  
            year: `${currentDate.getFullYear()}`,
            month: `${currentDate.getMonth()}`,
            updatedAt: currentDate,
            createdAt: currentDate,
        });
    }
}
