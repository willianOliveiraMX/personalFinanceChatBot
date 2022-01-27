import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<UserInterface>,
  ) {}

  create(User: UserInterface): Promise<UserInterface> {
    return this.userRepository.save(User).catch((e) => {

      if (e.code === "23505") {
        throw new HttpException(
        {
          status: HttpStatus.CONFLICT ,
          error: e.detail,
        },
        HttpStatus.CONFLICT,
      );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: e.detail,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return e;
    });
  }
}
