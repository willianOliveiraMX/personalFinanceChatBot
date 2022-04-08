import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TempUserInfo } from './tempUserInfo.entity';
import { TempUserInterface } from './tempUserInfo.interface';

@Injectable()
export class TempUserService {
    constructor(
        @InjectRepository(TempUserInfo)
        private readonly tempUserRepository: Repository<TempUserInterface>,
    ) {}

    create(tempUser: TempUserInterface): any{
        console.log(tempUser)
        return this.tempUserRepository.save(tempUser)
    }
}
