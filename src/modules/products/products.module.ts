import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Event } from '../events-analyzer/entities/events.entity';

import { ProductRepository } from './repository/product.repository';
import { UserProduct } from './entities/user-product.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, UserProduct,  Event, User]),
    UserModule
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    Product,
    UserProduct
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
