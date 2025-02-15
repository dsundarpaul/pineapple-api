import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
// import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    // private readonly _logger: LoggerService
  ) {}

  private readonly _logger = new Logger(ProductRepository.name);
  
  createProduct(createProductDto: any): any {
    try {
      const newProduct = this._productRepository.create(createProductDto);
      return this._productRepository.save(newProduct as Object);
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'createProduct',
        errorMessage: 'Db error while creating product',
        data: createProductDto,
        context: error?.message
      });
    }
  }

  findByAuthorIdAndProductName(authorId: string, name): any {
    try {
      const product = this._productRepository.find({ where: { authorId, productName: name } });
      console.assert(product, 'Product not found');
      return product;
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'findByAuthorId',
        errorMessage: 'Db error while finding product by author id',
        data: authorId,
        context: error?.message
      });
    }
  }

  findOne(id: string): Promise<Product> {
    try {
      return this._productRepository.findOne({ where: { id } });
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'findOne',
        errorMessage: 'Db error while finding product by id',
        data: id,
        context: error?.message
      });
    }
  }

  update(id: string, updateProductDto: any): Promise<Product> {
    try {
      return this._productRepository.save({
        id,
        ...updateProductDto
      });
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'update',
        errorMessage: 'Db error while updating product',
        data: { id, updateProductDto },
        context: error?.message
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this._productRepository.softDelete(id);
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'remove',
        errorMessage: 'Db error while removing product',
        data: id,
        context: error?.message
      });
    }
  }
}