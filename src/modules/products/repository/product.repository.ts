import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { UserProduct } from "../entities/user-product.entity";
// import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    @InjectRepository(UserProduct)
    private _userProductRepository: Repository<UserProduct>
    // private readonly _logger: LoggerService
  ) {}

  private readonly _logger = new Logger(ProductRepository.name);
  
  createProduct(createProductDto: CreateProductDto, userId: string): any {
    try {
      this._productRepository.create(createProductDto);
      return this._productRepository.save(createProductDto as Object);
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

  async findAllByUserId(userId: string): Promise<Product[]> {
    try {
      const userProducts = await this._userProductRepository.find({
        where: { userId: userId },
        relations: ['product'],
      });
      // const userProducts = await this._userProductRepository.createQueryBuilder('user_product')

      return userProducts.map(up => ({
        ...up.product,
        role: up.role,
      }));

      // return this._productRepository.find({ where: { authorId: userId } });
    } catch (error) {
      this._logger.error({
        module: 'products',
        class: 'ProductRepository',
        method: 'findAllByUserId',
        errorMessage: 'Db error while finding all products by user id',
        data: userId,
        context: error?.message
      });
    }
  }

  findByAuthorIdAndProductName(authorId: string, name): any {
    try {
      return {}
      // const product = this._productRepository.find({ where: { authorId, productName: name } });
      // console.assert(product, 'Product not found');
      // return product;
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