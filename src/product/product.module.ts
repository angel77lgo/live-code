import { Module } from '@nestjs/common';
import { ProductController } from './infraestructure/product.controller';
import { ProductService } from './domain/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
