import { ICommand } from "@nestjs/cqrs";
import { AddOrderDto } from "../../../domain/dto/order.dto";

export class AddOrderCommand implements ICommand {
  constructor(readonly addOrder: AddOrderDto) {}
}