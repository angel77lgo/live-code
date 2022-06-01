import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/domain/user.entity";
import { OrderProduct } from "./order-product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderDate: Date;


  @Column()
  userId: string;

  @Column()
  dinerId: string;

  @ManyToOne(() =>  User, (user) => user.orders, {eager: true})
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date
  @DeleteDateColumn()
  deletedAt?: Date

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { eager: true})
  orderProducts?: OrderProduct[]


}