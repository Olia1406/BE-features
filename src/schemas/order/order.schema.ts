import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    collection: 'orders'
})
export class OrderS {
    id?: string;
    @Prop({
        type: String,
        required: true,
    }) userId: string;
    @Prop({
        type: String,
        required: true,
    }) name: string;
    @Prop({
        type: String,
        required: true,
    }) wayToPayId: string;
    @Prop({
        type: String,
        required: true,
    }) address: string;
    @Prop({
        type: Array<String>,
        required: true
    }) productsList: {_id: string, qty: number}[];
    @Prop({
        type: Boolean,
    }) isDelivered: boolean;
}

export type OrderDocument = OrderS & Document;
export const OrderSchema = SchemaFactory.createForClass(OrderS);