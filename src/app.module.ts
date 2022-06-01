import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DinerModule } from './diner/diner.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { Order } from './order/domain/order.entity';
import { User } from './user/domain/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from './product/domain/product.entity';
import { Diner } from './diner/domain/diner.entity';
import { OrderProduct } from './order/domain/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Order, User, Product, Diner, OrderProduct],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      logging: true
    }),
    OrderModule,
    DinerModule,
    UserModule,
    ProductModule,
    ReportModule,
    CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
