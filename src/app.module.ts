import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DinerModule } from './diner/diner.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [OrderModule, DinerModule, UserModule, ProductModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
