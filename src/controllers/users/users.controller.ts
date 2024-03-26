import { Body, Controller, HttpStatus, Post, Res, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/UserDto';
import { UserDbService } from 'src/schemas/user/user.service';
import * as md5 from 'md5';
// import { Response } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private userDbServ: UserDbService) {}

  @Post('create')
  @ApiResponse({ status: HttpStatus.OK })
  async add(@Body() user: CreateUserDto): Promise<any> {
    const userModel: CreateUserDto = {
      ...user,
      password: md5(user.password + 'qwerty'),
    };
    return await this.userDbServ.create(userModel);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() user: CreateUserDto, @Res({passthrough: true}) response: Response): Promise<any> {
    console.log('res', (response as any).cookie)
    const userModel: CreateUserDto = {
      ...user,
      password: md5(user.password + 'qwerty'),
    };

    const logged = await this.userDbServ.login(userModel);
    // console.log(logged)
    // res.cookies.'token',logged._id);
    // response.cookies['token'] = logged._id;
    // const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    // const jwtToken = await this.jwtService.signAsync({id: user.user_id});
    (response as any).cookie('jwt', logged._id, {});
    return 1;
  }
}
