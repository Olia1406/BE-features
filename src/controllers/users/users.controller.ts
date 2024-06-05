import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Response,
  Get,
  Req,
  Session,
} from '@nestjs/common';
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
  async login(
    @Session() session: Record<string, any>,
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    console.log('res', (response as any).cookie);
    const userModel: CreateUserDto = {
      ...user,
      password: encodeStr(user.password),
    };

    const logged = await this.userDbServ.login(userModel);

    if (logged) {
      // (response as any).cookie('jwt', logged._id, {});
      session.user = logged;
      return 1;
    } else {
      throw new HttpException(
        'Incorrect password or email.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('user-info')
  @ApiResponse({ status: HttpStatus.OK, type: Array<any> })
  async getInfo(
    @Session() session: Record<string, any>,
    @Req() req: any,
  ): Promise<any> {
    console.log(req.cookies['jwt']);

    // if (req.cookies['jwt']) {
    if (session.user) {
      // const user = await this.userDbServ.getById(req.cookies['jwt']);
      const user = await this.userDbServ.getById(session.user._id);
      return user;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Post('logout')
  @ApiResponse({ status: HttpStatus.OK })
  async logout(
    @Session() session: Record<string, any>,
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    console.log('res', (response as any).cookie);

    session.user = null;
    return {};
  }
}
