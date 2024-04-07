import { Body, Controller, HttpException, HttpStatus, Post, Res, Response, Get, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/UserDto';
import { encodeStr } from 'src/helpers/encodeStr';
import { UserDbService } from 'src/schemas/user/user.service';
@Controller('api/users')
export class UsersController {
  constructor(private userDbServ: UserDbService) {}

  @Post('create')
  @ApiResponse({ status: HttpStatus.OK })
  async add(@Body() user: CreateUserDto): Promise<any> {
    const userModel: CreateUserDto = {
      ...user,
      password: encodeStr(user.password),
    };
    return await this.userDbServ.create(userModel);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK })
  async login(@Body() user: CreateUserDto, @Res({passthrough: true}) response: Response): Promise<any> {
    console.log('res', (response as any).cookie)
    const userModel: CreateUserDto = {
      ...user,
      password: encodeStr(user.password),
    };

    const logged = await this.userDbServ.login(userModel);
    // console.log(logged)
    // res.cookies.'token',logged._id);
    // response.cookies['token'] = logged._id;
    // const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    // const jwtToken = await this.jwtService.signAsync({id: user.user_id});
    if(logged) {
      (response as any).cookie('jwt', logged._id, {});
      return 1;
    } else {
      throw new HttpException('Incorrect password or email.', HttpStatus.BAD_GATEWAY)
    }
  }

  
  @Get('user-info')
  @ApiResponse({ status: HttpStatus.OK, type: Array<any> })
  async getInfo(@Req() req: any): Promise<any> {

    console.log(req.cookies);
    console.log(req.cookies['jwt']);

    const user = await this.userDbServ.getById(req.cookies['jwt'])
    console.log('user', user)

    if(req.cookies['jwt']) {
        return user;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
  }
  
}
