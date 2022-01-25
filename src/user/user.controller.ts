import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserInterface } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getHello(): string {
    return 'this is a user';
  }

  @Post()
  create(@Body() userInterface: UserInterface): Observable<UserInterface> {
    return this.userService.create(userInterface);
  }
}
