import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'users'
})
export class UserS {
    id?: string;
    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 70
    }) email: string;
    @Prop({
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    }) password: string;
    @Prop({
        type: String,
        required: false,
        default: 'user',
    }) role?: 'admin' | 'superadmin' | 'user';
}

export type UserDocument = UserS & Document;
export const UserSchema = SchemaFactory.createForClass(UserS);