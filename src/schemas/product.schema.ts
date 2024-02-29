import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'products'
})
export class ProductS {
    id?: string;
    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }) name: string;
    @Prop({
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    }) description: string;
    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }) category: string;
    @Prop({
        type: String,
        required: true
    }) image: string;
    @Prop({
        type: Number,
        required: true,
        min: 0
    }) price: number;
}

export type ProductDocument = ProductS & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductS);