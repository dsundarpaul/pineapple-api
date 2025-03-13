import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProduct, UserRole } from './entities/user-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly usersService: UserService,
    @InjectRepository(UserProduct)
    private userProductRepository: Repository<UserProduct>,
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  async create(createProductDto: CreateProductDto, userId: string) {
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'create',
      info: 'Product creation started',
      data: createProductDto
    });

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      this.logger.error({ module: 'products', class: 'ProductsService', method: 'create', errorMessage: 'User not found',
        data: { userId }
      });

      throw new NotFoundException('User not found');
    }

    const createdProduct = await this._productRepository.createProduct(createProductDto, userId);

    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'create',
      info: 'Product creation completed',
      data: createdProduct
    });

    const userProduct = this.userProductRepository.create({
      userId: user.id,
      productId: createdProduct.id,
      role: UserRole.ADMIN,
    });
    const savedUserProduct = await this.userProductRepository.save(userProduct);
    
    
    this.logger.log({ module: 'products', class: 'ProductsService', method: 'create', info: 'created record in user product',
      data: savedUserProduct
    });

    return createdProduct;
  }

  async findAllByUser(userId: string) {
    new Promise((resolve, reject) => { setTimeout(() => { resolve('Hello world!'); }, 5000); });
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'findAll',
      info: 'Finding all products',
    });

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const products = await this._productRepository.findAllByUserId(user.id);

    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'findAll',
      info: 'All products found',
      data: products
    });

    return products;
  }

  async findOne(id: string) {
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'findOne',
      info: 'Finding product by id',
      data: { id }
    });

    const product = await this._productRepository.findOne(id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'update',
      info: 'Updating product',
      data: { id, updateProductDto }
    });

    const existingProduct = await this.findOne(id);

    const updatedProduct = await this._productRepository.update(id, {
      ...existingProduct,
      ...updateProductDto,
    });

    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'update',
      info: 'Product updated successfully',
      data: updatedProduct
    });

    return updatedProduct;
  }

  async remove(id: string) {
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'remove',
      info: 'Removing product',
      data: { id }
    });

    await this.findOne(id); // Verify product exists
    await this._productRepository.remove(id);

    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'remove',
      info: 'Product removed successfully',
      data: { id }
    });
  }
}
