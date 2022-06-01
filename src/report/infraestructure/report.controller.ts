import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('/api/report')
export class ReportController {

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}
  
}
