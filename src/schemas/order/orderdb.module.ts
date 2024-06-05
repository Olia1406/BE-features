/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderS, OrderSchema } from './order.schema';
import { OrderDbService } from './order.service';
import { ProductS, ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderS.name,
        schema: OrderSchema,
      },
      { name: ProductS.name, schema: ProductSchema },
    ]),
  ],
  controllers: [],
  providers: [OrderDbService],
  exports: [MongooseModule, OrderDbService],
})
export class OrderDbModule {}
