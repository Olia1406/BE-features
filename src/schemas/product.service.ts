/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductS } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductDbService {
    constructor(@InjectModel(ProductS.name) private productModel: Model<ProductDocument>) { }

    async getList(query: any): Promise<ProductDocument[]> {
        const categorySearch = query.category ? { category: { $in: query.category?.split(',') } } : {}
        return this.productModel.find<ProductDocument>(categorySearch).exec()
    }

    async getById(prodId: string): Promise<ProductDocument> {
        return this.productModel.findById(prodId as any);
    }

    async create(product: ProductS) {
        return this.productModel.create(product);
    }

    async delete(prodId: string) {
        return await this.productModel.deleteOne({ '_id': prodId })
    }
}
