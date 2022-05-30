import { Module } from '@nestjs/common';
import { ReportController } from './infraestructure/report.controller';
import { ReportService } from './domain/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
