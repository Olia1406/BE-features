import { OrderDbModule } from 'src/schemas/order/orderdb.module';
import { OrdersController } from './orders.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [OrderDbModule],
    controllers: [
        OrdersController,],
    providers: [],
})
export class OrdersModule { }
