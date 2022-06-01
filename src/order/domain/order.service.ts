import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, createQueryBuilder, Repository } from 'typeorm';
import { AcRoles } from '../../core/auth/domain/auth.roles';
import { Diner } from '../../diner/domain/diner.entity';
import { Product } from '../../product/domain/product.entity';
import { User } from '../../user/domain/user.entity';
import { AddOrderDto } from './dto/order.dto';
import { OrderProduct } from './order-product.entity';
import { OrderInterface } from './order.contract';
import { Order } from './order.entity';


export class OrderService implements OrderInterface {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Diner) private readonly dinerRepository: Repository<Diner>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderProduct) private readonly orderProductRepository: Repository<OrderProduct>
  ) { }

  async createOrder(addOrder: AddOrderDto) {

    const { createdBy } = addOrder;

    const exist = await this.userRepository.findOne(createdBy);
    console.log(exist);
    if (exist == undefined) {
      throw new HttpException("No existe usuario", 404);
    }
    if (exist.role != AcRoles.OPERATOR) {
      throw new HttpException("No Autorizado", 401);
    }

    const { products } = addOrder;
    let newProducts = [];
    products.forEach(async (product: Product) => {
      console.log(product)

      const nprodcut = await this.productRepository.save(product)
      newProducts.push(nprodcut);
    });

    const { diner } = addOrder;

    const createdDiner = await this.dinerRepository.save(diner);

    const newOrder = new Order()

    newOrder.userId = createdBy;
    newOrder.orderDate = new Date();
    newOrder.dinerId = createdDiner.id;


    const lastOrder = await this.orderRepository.save(newOrder);


    newProducts.forEach(async (products) => {
      console.log(products);

      const orderProduct = new OrderProduct();

      orderProduct.orderId = lastOrder.id
      orderProduct.productId = products.id;
      orderProduct.quantity = products.quantity;
      orderProduct.total = products.unitPrice * products.quantity;


      await this.orderProductRepository.save(orderProduct);
    })

    return { "message": "orden creada correctamente" };

  }

  public async getOrders(userId: string, startDate: Date, endDate: Date) {

    const orders = await this.orderRepository.find({ orderDate: Between(startDate, endDate) })

    

    return orders;

  }

}
