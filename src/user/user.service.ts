import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<UserInterface>,
  ) {}

  create(User: UserInterface): Observable<UserInterface> {
    return from(this.userRepository.save(User));
  }
}
