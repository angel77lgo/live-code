import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}
}
