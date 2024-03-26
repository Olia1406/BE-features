/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserS } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserDbService {
    constructor(@InjectModel(UserS.name) private userModel: Model<UserDocument>) { }

    async create(user: UserS) {
        return this.userModel.create(user);
    }

    async login(user: UserS) {
        return this.userModel.findOne({ email: user.email, password: user.password })
    }

}
