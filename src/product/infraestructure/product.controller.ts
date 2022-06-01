import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('/api/product')
export class ProductController {

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}
  
}
