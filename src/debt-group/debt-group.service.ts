import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { debtGroupEntity } from './debt-group.entity';
import { DebtGroup } from './debt-group.interface';

@Injectable()
export class DebtGroupService {
    constructor(
        @InjectRepository(debtGroupEntity)
        private readonly debtGroupRepository: Repository<DebtGroup>
    ){}

    create(debtGroup: DebtGroup) {
        return this.debtGroupRepository.save({...debtGroup, updatedAt: new Date() });
    }

    fetch(id: number) {
        return this.debtGroupRepository.findOne({ where: { id: id }});
    }

    update(debtGroup: DebtGroup) {
        return this.debtGroupRepository.update(
        debtGroup.id,
        {
            updatedAt: new Date(),
            description: debtGroup.description
        });
    }
}
