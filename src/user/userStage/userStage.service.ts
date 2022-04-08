import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStage } from './userStage.entity';
import { UserStageInterface } from './userStage.interface';

@Injectable()
export class UserStageService {
    constructor(
        @InjectRepository(UserStage)
        private readonly userStageRepository: Repository<UserStageInterface>,
    ) {}

    create(userStageInterface: UserStageInterface): any{
        console.log(userStageInterface)
        return this.userStageRepository.save(userStageInterface)
    }
}
