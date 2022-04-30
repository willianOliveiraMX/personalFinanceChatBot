import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temp_user_info } from './tempUserInfo.entity';
import { TempUserInterface } from './tempUserInfo.interface';

@Injectable()
export class TempUserService {
    constructor(
        @InjectRepository(Temp_user_info)
        private readonly tempUserRepository: Repository<TempUserInterface>,
    ) {}

    create(tempUser: TempUserInterface): any{
        return this.tempUserRepository.save(tempUser)
    }
}
