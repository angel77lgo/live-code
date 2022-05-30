import { Module, OnModuleInit } from '@nestjs/common';
import { OrderController } from './infraestructure/order.controller';
import { OrderService } from './domain/order.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';


const commandHandlers = [];

const queryHandlers = [];

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
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
