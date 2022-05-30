import { Module, OnModuleInit } from '@nestjs/common';
import { UserController } from './infraestructure/user.controller';
import { UserService } from './domain/user.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

const commandHandlers = [];

const queryHandlers = [];
@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) { }

  onModuleInit() {
    this.command$.register(commandHandlers)
    this.query$.register(queryHandlers)
  }
}
