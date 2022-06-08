import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { User_stage } from './userStage.entity';
import { UserStageInterface, UserStageUpdate } from './userStage.interface';

@Injectable()
export class UserStageService {
    constructor(
        @InjectRepository(User_stage)
        private readonly userStageRepository: Repository<UserStageInterface>,
    ) {}

    create(userStageInterface: UserStageInterface): any{
        return this.userStageRepository.save(userStageInterface)
    }

    update(userStageUpdate: UserStageUpdate): any {
        return this.userStageRepository.update(userStageUpdate.id, {
            stageid: userStageUpdate.stageid
        })
    }

    async getUserStageByToken(token: string): Promise<any> {
        return await this.userStageRepository
                        .createQueryBuilder('user_stage')
                        .select(['user_stage.id, user_stage.token_chatid, description, stageidentifier'])
                        .innerJoin('stage', 'stage', 'stage.id = user_stage.stageid')
                        .innerJoin('temp_user_info', 'temp_user_info', 'temp_user_info.id = user_stage.temp_userid' )
                        .where('user_stage.token_chatid = :token_chatid', {token_chatid: token})
                        .getRawMany()
    }

    async getStages(): Promise<any>{
        return await createQueryBuilder("stage")
                        .where({ isvalid: true })
                        .getMany()
    }
}
