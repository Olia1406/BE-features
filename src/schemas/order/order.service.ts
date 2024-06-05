/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, OrderS } from './order.schema';
import { Model } from 'mongoose';
import { ProductDocument, ProductS } from '../product/product.schema';

interface OrderQuery {
  isDelivered?: boolean;
  productsShortList?: { _id: string; qty: number }[];
}

@Injectable()
export class OrderDbService {
  constructor(
    @InjectModel(OrderS.name) private orderModel: Model<OrderDocument>,
    @InjectModel(ProductS.name) private productModel: Model<ProductDocument>,
  ) {}

  async getOrders(query: OrderQuery = null, userId?: string): Promise<OrderDocument[]> {
    const ordersWithShortProdList = await this.orderModel
      .find<OrderDocument>()
      .lean();
    const orderWhithFullProdsList = [];

    for (const order of ordersWithShortProdList) {
      const shortList = JSON.parse(JSON.stringify(order.productsList));
      const orderProdsIds = shortList.map((prod) => prod._id);
      const fullList = await this.productModel
        .find<ProductDocument>({ _id: { $in: orderProdsIds } })
        .lean();

      const shortMap = new Map<string, any>(
        shortList.map((prod) => [prod._id, { ...prod }]),
      );
      const fullMap = new Map<string, any>(
        fullList.map((prod) => [prod._id.valueOf(), { ...prod }]),
      );

      fullMap.forEach((value, key) => {
        value.qty = shortMap.get(key).qty;
      });

      const matchedProductList = Array.from(fullMap.values());

      orderWhithFullProdsList.push({
        id: order._id,
        name: order.name,
        wayToPayId: order.wayToPayId,
        address: order.address,
        isDelivered: order.isDelivered,
        productsList: matchedProductList,
      });
    }

    return orderWhithFullProdsList;
  }

  async getOrderProductsList(prodIds: string[]): Promise<ProductDocument[]> {
    return this.orderModel.find<ProductDocument>(prodIds).exec();
  }

  async create(order: OrderS) {
    return this.orderModel.create(order);
  }

  async edit(orderId: string, userId: string, isDelivered = true ) {
    return this.orderModel.updateOne(
      { _id: orderId, userId },
      { $set: { isDelivered } },
    );
  }

  async delete(orderId: string, userId: string) {
    return await this.orderModel.deleteOne({ _id: orderId, userId });
  }
}
