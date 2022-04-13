import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { debtGroupEntity } from './debt-group.entity';
import { Debt_group } from './debt-group.interface';

@Injectable()
export class DebtGroupService {
    constructor(
        @InjectRepository(debtGroupEntity)
        private readonly debtGroupRepository: Repository<Debt_group>
    ){}

    create(debt_group: Debt_group) {
        return this.debtGroupRepository.save({...debt_group, updatedat: new Date() });
    }

    fetch(id: number) {
        return this.debtGroupRepository.findOne({ where: { id: id }});
    }

    update(debt_group: Debt_group) {
        return this.debtGroupRepository.update(
        debt_group.id,
        {
            updatedat: new Date(),
            description: debt_group.description
        });
    }
}
