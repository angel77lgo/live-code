import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('/api/diner')
export class DinerController {

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}
}
