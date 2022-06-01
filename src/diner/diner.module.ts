import { Module, OnModuleInit } from '@nestjs/common';
import { DinerController } from './infraestructure/diner.controller';
import { DinerService } from './domain/diner.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DINER_SERVICE_TOKEN } from './domain/diner.contract';


const commandHandlers = [];

const queryHandlers = [];
@Module({
  controllers: [DinerController],
  providers: [
    { provide: DINER_SERVICE_TOKEN, useClass: DinerService },
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class DinerModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) { }

  onModuleInit() {
    this.command$.register(commandHandlers);
    this.query$.register(queryHandlers);
  }
}
