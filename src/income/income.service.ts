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

    getIncomesByUserId(userid: number): Promise<Income[]> {
        return this.incomeRepository.find(
            {
                where: {
                   userid: userid, isvalid: true
                }
            }
        )
    }

    getIncomesByUserIdAndMonthId(userid: number, monthid: number): Promise<Income[]> {
        return this.incomeRepository.find(
            {
                where: {
                   userid, 
                   monthid,
                   isvalid: true
                }
            }
        )
    }

    create(Income: Income): Promise<Income> {
        return this.incomeRepository.save({...Income, updatedat: new Date() })
    }

    delete(incomeId: number): any {
        return this.incomeRepository.update(incomeId, { isvalid: false });
    }

    update(income: Income): any {
        return this.incomeRepository.update(income.id, {
            updatedat: new Date(),
            ...income.description ? ({description: income.description}) : null, 
            ...income.value ? ({value: income.value}) : null,
        });
    }
}
