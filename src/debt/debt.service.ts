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
        return this.debtRepository.save({...Debt, updatedAt: new Date() });
    }

    getDebtByUserId(userId: number, pageNumber: number): Promise<Debt[]> {
        const skip = pageNumber === 1 ? 0 : ((pageNumber -1) * 5); 
        return this.debtRepository.find({ 
            where: { userId, isValid: true}, 
            order: {
                'id': 'ASC'
            },
            take: 5,
            skip
        });
    }

    deleteDebtById(id: number) {
        return this.debtRepository.update(id, { isValid: false })
    }

    updateDebtById(debt: Debt) {
        return this.debtRepository.update(
            debt.id,
            {
                updatedAt: new Date(),
                ...debt.description ? ({description: debt.description}) : null, 
                ...debt.value && debt.value !== 0 ? ({value: debt.value}) : null,
                ...debt.monthId ? ({monthId: debt.monthId}) : null,
                ...debt.isalreadypay ? ({isalreadypay: debt.isalreadypay}) : null,
                ...debt.groupId ? ({groupId: debt.groupId}) : null,
                ...debt.dateToPay ? ({dateToPay: debt.dateToPay}) : null,
            }
        );
    }
}
