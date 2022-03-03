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

    getIncomesByUserId(userId: number): Promise<Income[]> {
        return this.incomeRepository.find(
            {
                where: {
                   userId: userId, isValid: true
                }
            }
        )
    }

    getIncomesByUserIdAndMonthId(userId: number, monthId: number): Promise<Income[]> {
        return this.incomeRepository.find(
            {
                where: {
                   userId, 
                   monthId,
                   isValid: true
                }
            }
        )
    }

    create(Income: Income): Promise<Income> {
        return this.incomeRepository.save({...Income, updatedAt: new Date() })
    }

    delete(incomeId: number): any {
        return this.incomeRepository.update(incomeId, { isValid: false });
    }

    update(income: Income): any {
        return this.incomeRepository.update(income.id, {
            updatedAt: new Date(),
            ...income.description ? ({description: income.description}) : null, 
            ...income.value ? ({value: income.value}) : null,
        });
    }
}
