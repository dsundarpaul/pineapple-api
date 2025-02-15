import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from './repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Logger } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: {
            createProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
    it('should create a product and return it', async () => {
      const createProductDto: CreateProductDto = { name: 'Test Product', authorId: '2', domain: 'soli' };
      const createdProduct = { id: 1, ...createProductDto };

      jest.spyOn(repository, 'createProduct').mockResolvedValue(createdProduct);
      const loggerSpy = jest.spyOn(Logger.prototype, 'log');

      const result = await service.create(createProductDto);

      expect(repository.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(createdProduct);
      expect(loggerSpy).toHaveBeenCalledTimes(2);
    });
  // });
});
