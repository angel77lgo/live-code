import { ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Diner } from "./diner/domain/diner.entity";
import { OrderProduct } from "./order/domain/order-product.entity";
import { Order } from "./order/domain/order.entity";
import { Product } from "./product/domain/product.entity";
import { User } from "./user/domain/user.entity";


const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [Order, User, Product, Diner, OrderProduct],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['src/core/migrations/{*.ts,.js}'],
  cli : {
    migrationsDir: 'src/core/migrations'
  }
}

export = config;