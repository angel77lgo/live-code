import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddOrderCommand } from '../application/command/impl/add-order.command';
import { GetOrdersByUserQuery } from '../application/query/impl/get-orders-by-user.query';
import { AddOrderDto } from '../domain/dto/order.dto';

@Controller('/api/order')
export class OrderController {

  constructor(
    private readonly command: CommandBus,
    private readonly query: QueryBus
  ) {}


  @Post()
  @HttpCode(201)
  public async createOrder (@Body() orderAdd: AddOrderDto) {
    return await this.command.execute(new AddOrderCommand(orderAdd))
  }

  @Get()
  @HttpCode(200)
  public async getOrder(@Query('userId') userId: string, @Query('startDate') startDate: Date, @Query('endDate') endDate: Date) {
    return await this.query.execute(new GetOrdersByUserQuery(userId, startDate, endDate));
  }

}
