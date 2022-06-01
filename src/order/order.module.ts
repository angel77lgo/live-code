import { Module, OnModuleInit } from '@nestjs/common';
import { OrderController } from './infraestructure/order.controller';
import { OrderService } from './domain/order.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ORDER_SERVICE_TOKEN } from './domain/order.contract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order.entity';
import { GetOrdersByUserHandler } from './application/query/handler/get-orders-by-user.handler';
import { AddOrderCommand } from './application/command/impl/add-order.command';
import { AddOrderHanlder } from './application/command/handler/add-order.handler';
import { Product } from '../product/domain/product.entity';
import { Diner } from '../diner/domain/diner.entity';
import { User } from '../user/domain/user.entity';
import { OrderProduct } from './domain/order-product.entity';


const commandHandlers = [AddOrderHanlder];

const queryHandlers = [GetOrdersByUserHandler];

@Module({
  imports:[
    TypeOrmModule.forFeature([Order, Product, Diner, User, OrderProduct])
  ],
  controllers: [OrderController],
  providers: [
    {provide: ORDER_SERVICE_TOKEN, useClass: OrderService},
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class OrderModule implements OnModuleInit {
  constructor (
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) {}

  onModuleInit() {
    this.command$.register(commandHandlers);
    this.query$.register(queryHandlers);
  }
}
