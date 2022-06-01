import { IQuery } from "@nestjs/cqrs";

export class GetOrdersByUserQuery implements IQuery {
  constructor(readonly userId: string, readonly startDate: Date, readonly endDate) {}
}