import { ProductDbModule } from 'src/schemas/productdb.module';
import { ProductsController } from './products.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [ProductDbModule],
    controllers: [
        ProductsController,],
    providers: [],
})
export class ProductsModule { }
