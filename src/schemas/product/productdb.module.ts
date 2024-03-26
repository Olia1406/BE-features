/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductS, ProductSchema } from './product.schema';
import { ProductDbService } from './product.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: ProductS.name, schema: ProductSchema
    }])],
    controllers: [],
    providers: [ProductDbService],
    exports: [MongooseModule, ProductDbService]
})
export class ProductDbModule {}
