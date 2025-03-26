import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepository } from './repository/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Logger, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserProduct, UserRole } from './entities/user-product.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: ProductRepository;
  let userService: UserService;
  let userProductRepository: Repository<UserProduct>;

  const mockUser = {
    id: 'user-123',
    userId: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    type: 'user',
    avatar: null,
    phone: null,
    userProducts: [],
    isActive: true,
    isArchived: false
  } as User;

  const mockProduct = {
    id: 'product-123',
    name: 'Test Product',
    githubRepoLink: 'https://github.com/test',
    productDocLink: 'https://docs.test',
    domain: 'test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: {
            createProduct: jest.fn(),
            findAllByUserId: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserProduct),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<ProductRepository>(ProductRepository);
    userService = module.get<UserService>(UserService);
    userProductRepository = module.get<Repository<UserProduct>>(getRepositoryToken(UserProduct));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      githubRepoLink: 'https://github.com/test',
      productDocLink: 'https://docs.test',
      domain: 'test.com',
      authorId: 'user-123',
    };

    it('should successfully create a product and user-product relationship', async () => {
      // Mock dependencies
      jest.spyOn(userService, 'findOneById').mockResolvedValue(mockUser);
      jest.spyOn(productRepository, 'createProduct').mockResolvedValue(mockProduct);
      jest.spyOn(userProductRepository, 'create').mockReturnValue({
        userId: mockUser.id,
        productId: mockProduct.id,
        role: UserRole.ADMIN,
      } as UserProduct);
      jest.spyOn(userProductRepository, 'save').mockResolvedValue({
        id: 'user-product-123',
        userId: mockUser.id,
        productId: mockProduct.id,
        role: UserRole.ADMIN,
      } as UserProduct);

      const result = await service.create(createProductDto, mockUser.id);

      expect(userService.findOneById).toHaveBeenCalledWith(mockUser.id);
      expect(productRepository.createProduct).toHaveBeenCalledWith(createProductDto, mockUser.id);
      expect(userProductRepository.create).toHaveBeenCalledWith({
        userId: mockUser.id,
        productId: mockProduct.id,
        role: UserRole.ADMIN,
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userService, 'findOneById').mockResolvedValue(null);

      await expect(service.create(createProductDto, 'non-existent-user'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('findAllByUser', () => {
    it('should return all products for a user', async () => {
      const userId = 'user-123';
      const mockProducts = [
        {
          id: 'product-1',
          productName: 'Product 1',
          userProducts: [],
          logo: null,
          productDocLink: '',
          githubRepoLink: '',
          domain: '',
          isActive: true,
          isArchived: false,
          // role: UserRole.ADMIN
        },
        {
          id: 'product-2',
          productName: 'Product 2',
          userProducts: [],
          logo: null,
          productDocLink: '',
          githubRepoLink: '',
          domain: '',
          isActive: true,
          isArchived: false,
          role: UserRole.MEMBER
        }
      ] as Product[];

      jest.spyOn(userService, 'findOneById').mockResolvedValue(mockUser);
      jest.spyOn(productRepository, 'findAllByUserId').mockResolvedValue(mockProducts);

      const result = await service.findAllByUser(userId);

      expect(userService.findOneById).toHaveBeenCalledWith(userId);
      expect(productRepository.findAllByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockProducts);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userService, 'findOneById').mockResolvedValue(null);

      await expect(service.findAllByUser('non-existent-user'))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});