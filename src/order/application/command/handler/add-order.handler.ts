import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler, IQueryHandler } from "@nestjs/cqrs";
import { OrderInterface, ORDER_SERVICE_TOKEN } from "../../../domain/order.contract";
import { AddOrderCommand } from "../impl/add-order.command";

@CommandHandler(AddOrderCommand)
export class AddOrderHanlder implements ICommandHandler<AddOrderCommand> {
  constructor (@Inject(ORDER_SERVICE_TOKEN) private readonly orderService: OrderInterface) {}

  public async execute(command: AddOrderCommand): Promise<any> {
    return await this.orderService.createOrder(command.addOrder);
  }

}