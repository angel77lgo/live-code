import { Module, OnModuleInit } from '@nestjs/common';
import { ReportController } from './infraestructure/report.controller';
import { ReportService } from './domain/report.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';


const commandHandlers = [];

const queryHandlers = [];

@Module({
  controllers: [ReportController],
  providers: [
    ReportService,
    CommandBus,
    QueryBus,
    ...commandHandlers,
    ...queryHandlers
  ]
})
export class ReportModule implements OnModuleInit {
  constructor(
    private readonly command$: CommandBus,
    private readonly query$: QueryBus
  ) { }

  onModuleInit() {
    this.command$.register(commandHandlers)
    this.query$.register(queryHandlers)
  }
}
