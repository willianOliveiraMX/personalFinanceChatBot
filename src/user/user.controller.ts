import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './user.interface';
import { HttpExceptionFilter } from '../filters/http-filter';
// @UseInterceptors(UserInterceptor)

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getHello(): string {
    return 'this is a user';
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  create(@Body() userInterface: UserInterface): Promise<UserInterface> {
    return this.userService.create(userInterface)
  }
}
