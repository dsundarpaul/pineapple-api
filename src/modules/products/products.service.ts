import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _productRepository: ProductRepository
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  async create(createProductDto: CreateProductDto) {
    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'create',
      info: 'Product creation started',
    });

    const createdProduct = await this._productRepository.createProduct(createProductDto);

    this.logger.log({
      module: 'products',
      class: 'ProductsService',
      method: 'create',
      info: 'Product creation completed',
      data: createdProduct
    });
    
    return createdProduct;
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
