/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserS, UserSchema } from './user.schema';
import { UserDbService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: UserS.name, schema: UserSchema
    }])],
    controllers: [],
    providers: [UserDbService],
    exports: [MongooseModule, UserDbService]
})
export class UserDbModule {}
