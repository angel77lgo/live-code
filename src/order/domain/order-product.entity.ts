import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/domain/product.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order?: Order

  @OneToMany(() => Product, (product) => product.order)
  products?: Product[]

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date

  @DeleteDateColumn()
  deletedAt?: Date

}