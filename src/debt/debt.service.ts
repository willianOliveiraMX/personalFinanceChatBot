import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { debtEntity } from './debt.entity';
import { Debt } from './debt.interface';

@Injectable()
export class DebtService {
    constructor(
        @InjectRepository(debtEntity)
        private readonly debtRepository: Repository<Debt>
    ){}

    create(Debt: Debt): any {
        return this.debtRepository.save({...Debt, updatedat: new Date() });
    }

    getDebtByUserId(userid: number, pageNumber: number, monthid: number | null): Promise<Debt[]> {
        const skip = pageNumber === 1 ? 0 : ((pageNumber -1) * 5); 
        return this.debtRepository.find({ 
            where: { userid, ...(monthid ? {monthid: monthid} : null), isvalid: true}, 
            order: {
                'id': 'ASC'
            },
            take: 5,
            skip
        });
    }

    getDebtByUserIdAndMonthId(userid: number, monthid: number): Promise<Debt[]> {
        return this.debtRepository.find({ 
            where: { 
                userid, 
                monthid, 
                isvalid: true,
            }, 
            order: {
                'id': 'ASC'
            }
        });
    }

    deleteDebtById(id: number) {
        return this.debtRepository.update(id, { isvalid: false })
    }

    updateDebtById(debt: Debt) {
        return this.debtRepository.update(
            debt.id,
            {
                updatedat: new Date(),
                ...debt.description ? ({description: debt.description}) : null, 
                ...debt.value && debt.value !== 0 ? ({value: debt.value}) : null,
                ...debt.monthid ? ({monthid: debt.monthid}) : null,
                ...debt.isalreadypay ? ({isalreadypay: debt.isalreadypay}) : null,
                ...debt.groupid ? ({groupid: debt.groupid}) : null,
                ...debt.dateToPay ? ({dateToPay: debt.dateToPay}) : null,
            }
        );
    }
}
