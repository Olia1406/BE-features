
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserDbModule } from 'src/schemas/user/userdb.module';

@Module({
    imports: [UserDbModule],
    controllers: [
        UsersController,],
    providers: [],
})
export class UsersModule { }
