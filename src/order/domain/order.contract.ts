import { AddOrderDto } from "./dto/order.dto";

export const ORDER_SERVICE_TOKEN = "order_service_token";

export interface OrderInterface {
  getOrders(userId: string, startDate: Date, endDate: Date): any;
  createOrder(addOrder: AddOrderDto)
}