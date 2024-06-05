import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Request,
  Session,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  CreateOrderDto,
  DeleteOrderDto,
  Order,
  OrderDto,
} from 'src/dtos/OrderDto';
import { OrderDbService } from 'src/schemas/order/order.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private orderDbServ: OrderDbService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Array<OrderDto> })
  async getOrders(@Query() query: any, @Req() res: any): Promise<OrderDto[]> {
    // NOTE: if req is sent from fe, than query should be transform fron string 'isDelivered=true|false' to object {isDelivered: true|false}
    const qw = query ? { isDelivered: query.isDelivered } : null;
    const orders = await this.orderDbServ.getOrders(qw);
    return orders as any;
  }

  @Post('create')
  @ApiResponse({ status: HttpStatus.OK })
  async add(
    @Body() order: CreateOrderDto,
    @Session() session: Record<string, any>,
  ): Promise<any> {
    const userId = session.user?._id;

    if (userId) {
      const orderFulfilled = {
        userId,
        ...order,
      };
      return await this.orderDbServ.create(orderFulfilled);
    } else {
      throw new HttpException(
        'Please login.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('update')
  @ApiResponse({ status: HttpStatus.OK })
  async edit(
    @Body() order: Order,
    @Session() session: Record<string, any>,
  ): Promise<any> {
    const userId = session.user._id;
    return await this.orderDbServ.edit(order.id, userId);
  }

  @Delete('delete/:id')
  @ApiResponse({ status: HttpStatus.OK, type: DeleteOrderDto })
  async delete(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
  ): Promise<any> {
    const userId = session.user._id;
    return await this.orderDbServ.delete(id, userId);
  }
}
