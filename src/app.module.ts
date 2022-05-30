import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DinerModule } from './diner/diner.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [],
      synchronize: true
    }),
    OrderModule,
    DinerModule,
    UserModule,
    ProductModule,
    ReportModule,
    CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
