import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { OrderInterface, ORDER_SERVICE_TOKEN } from "../../../domain/order.contract";
import { GetOrdersByUserQuery } from "../impl/get-orders-by-user.query";

@QueryHandler(GetOrdersByUserQuery)
export class GetOrdersByUserHandler implements IQueryHandler<GetOrdersByUserQuery> {
  constructor(@Inject(ORDER_SERVICE_TOKEN) private readonly orderService: OrderInterface){}

 
  public async execute(query: GetOrdersByUserQuery): Promise<any> {
    return await this.orderService.getOrders(query.userId, query.startDate, query.endDate);
  }
}