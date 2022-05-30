import { Module } from '@nestjs/common';
import { DinerController } from './infraestructure/diner.controller';
import { DinerService } from './domain/diner.service';

@Module({
  controllers: [DinerController],
  providers: [DinerService]
})
export class DinerModule {}
