import { Module, OnModuleInit } from '@nestjs/common';
import { ProductController } from './infraestructure/product.controller';
import { ProductService } from './domain/product.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';


const commandHandlers = [];

const queryHandlers = [];
@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class ProductModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) { }

  onModuleInit() {
    this.command$.register(commandHandlers)
    this.query$.register(queryHandlers)
  }
}
