import { Diner } from "../../../diner/domain/diner.entity";
import { Product } from "../../../product/domain/product.entity";

export class AddOrderDto {
  products: Product[]
  diner: Diner
  createdBy: string;
}