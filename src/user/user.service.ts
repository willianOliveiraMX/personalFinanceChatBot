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

  findOne(id: number): Promise<UserInterface> {
    return this.userRepository.findOne(id, { where: { isValid: true } });
  }

  findOneByToken(token: string): Promise<UserInterface> {
    return this.userRepository.findOne({ where: { token, isValid: true } });
  }

  create(User: UserInterface): any{
    const result = this.userRepository.save(User)
    .catch((e) => {
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
    });

    return result;
  }

  update(User: UserInterface): any{
    const result = this.userRepository.update(User.id, 
      {
        updatedAt: new Date(),
        email: User.email,
        token: User.token
      });
    return result;
  }

  deleteOne(id: number): any{
    return this.userRepository.update(id, { isValid: false })
  }
}
