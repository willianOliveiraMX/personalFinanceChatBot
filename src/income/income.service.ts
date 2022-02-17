import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncomeEntity } from './income.entity';
import { Income } from './income.interface';

@Injectable()
export class IncomeService {
    constructor(
        @InjectRepository(IncomeEntity)
        private readonly incomeRepository: Repository<Income>
    ){}

    create(Income: Income): Promise<Income> {
        return this.incomeRepository.save({...Income, updatedAt: new Date() })
    }
}
