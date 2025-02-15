import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User])
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    Product
  ],
})
export class ProductsModule {}
