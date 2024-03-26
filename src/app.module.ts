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

@Module({
  imports: [
    UserDbModule,
    ProductDbModule,
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/products'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'fe_src'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [UserDbService, ProductDbService, AppService],
})
export class AppModule {}
