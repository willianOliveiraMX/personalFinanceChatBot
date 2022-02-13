import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './user.interface';
import { HttpExceptionFilter } from '../filters/http-filter';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  getUser(@Param() params): Promise<UserInterface> {
    const id = parseInt(params.id);
    if(!id || id === NaN) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST ,
          error: 'ID must be a number',
        },
        HttpStatus.BAD_REQUEST,
      );
    } 
    return this.userService.findOne(id);
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  create(@Body() userDto: UserDto): Promise<UserInterface> {
    return this.userService.create(userDto)
  }

  @Put()
  @UseFilters(new HttpExceptionFilter())
  update(@Body() userDto: UserDto): Promise<UserInterface> {
    return this.userService.update(userDto);
  }

  @Delete(':id')
  @UseFilters(new HttpExceptionFilter())
  delete(@Param() params): Promise<UserInterface> {
    const id = parseInt(params.id);
    if(!id || id === NaN) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST ,
          error: 'ID must be a number',
        },
        HttpStatus.BAD_REQUEST,
      );
    } 
    return this.userService.deleteOne(id);
  }
}
