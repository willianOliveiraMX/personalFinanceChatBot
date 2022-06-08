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
import { TempUserService } from './tempUserInfo/tempUserInfo.service';
import { UserInterface } from './user.interface';
import { HttpExceptionFilter } from '../filters/http-filter';
import { UserDto } from './user.dto';
import { UserStageService } from './userStage/userStage.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, 
    private tempUserService: TempUserService,
    private userStageService: UserStageService
  ) {}

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

  @Get('token/:token')
  @UseFilters(new HttpExceptionFilter())
  async getUserByToken(@Param() params): Promise<UserInterface> {
    const token = params.token;
    if(!token) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST ,
          error: 'Token must be a string',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = this.userService.findOneByToken(token);
    if (!await result) {
      return this.userStageService.getUserStageByToken(params.token);
    }
    return result;
  }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() userDto: UserDto): Promise<any> {
    if (!userDto.email){
      const userResultByToken = await this.userService.findOneByToken(userDto.token);
      if (userResultByToken?.id) {
        return {
          status: HttpStatus.OK,
          description: "User with this token is already add.",
          user: userResultByToken
        }
      }
      const userStageItem = await this.userStageService.getUserStageByToken(userDto.token);

      if (!userStageItem.length) {
        const stages = await this.userStageService.getStages();
        const USER_DONT_HAVE_EMAIL = stages.find(el => el.stageidentifier === "USER_DONT_HAVE_EMAIL");
        const tempUserItem = await this.tempUserService.create({
          usertempdata: {
            token_chatid: userDto.token
          }
        });
        return this.userStageService.create({
          stageid: USER_DONT_HAVE_EMAIL?.id || 1,
          temp_userid: tempUserItem.id,
          token_chatid: userDto.token
        });
      }
        return userStageItem;
    }
    return this.userService.create(userDto);
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
