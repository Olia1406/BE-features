import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './controllers/products/products.module';
import { UsersController } from './controllers/users/users.controller';
import { ProductDbService } from './schemas/product/product.service';
import { ProductDbModule } from './schemas/product/productdb.module';
import { UserDbService } from './schemas/user/user.service';
import { UserDbModule } from './schemas/user/userdb.module';
import { OrdersModule } from './controllers/orders/orders.module';
import { OrderDbService } from './schemas/order/order.service';
import { OrderDbModule } from './schemas/order/orderdb.module';
import { OrdersController } from './controllers/orders/orders.controller';

@Module({
  imports: [
    UserDbModule,
    ProductDbModule,
    OrderDbModule,
    ProductsModule,
    OrdersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'fe_src'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [AppController, UsersController, OrdersController],
  providers: [UserDbService, ProductDbService, OrderDbService, AppService],
})
export class AppModule {}
