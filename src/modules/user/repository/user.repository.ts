import { Injectable, Logger } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    // private readonly _logger: LoggerService
  ) {}

  private readonly _logger = new Logger(UserRepository.name);
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this._userRepository.create({
        name: createUserDto.username,
        email: createUserDto.userEmail,
        type: 'user', // default type
        isActive: true,
        isArchived: false
      });
      return await this._userRepository.save(newUser);
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'createUser',
        errorMessage: 'Db error while creating user',
        data: createUserDto,
        context: error?.message
      });
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this._userRepository.findOne({ where: { email } });
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'findByEmail',
        errorMessage: 'Db error while finding user by email',
        data: { email },
        context: error?.message
      });
      throw error;
    }
  }

  async findOne(email: string, password: string): Promise<User | null> {
    try {
      return await this._userRepository.findOne({
        where: { email },
        select: {
          avatar: true,
          blockedFrom: true,
          email: true,
          id: true,
          name: true,
          phone: true,
          type: true,
        },
      });
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'findOne',
        errorMessage: 'Db error while finding user by id',
        data: { email },
        context: error?.message
      });
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    try {
      const updateData: Partial<User> = {
        ...(updateUserDto.username && { name: updateUserDto.username }),
        ...(updateUserDto.userEmail && { email: updateUserDto.userEmail })
      };
      
      await this._userRepository.update(id, updateData);
      const updatedUser = {} 
      // const updatedUser = await this.findOne(id);
      if (!updatedUser) {
        throw new Error('User not found after update');
      }
      return updatedUser;
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'update',
        errorMessage: 'Db error while updating user',
        data: { id, updateUserDto },
        context: error?.message
      });
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this._userRepository.softDelete(id);
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'remove',
        errorMessage: 'Db error while removing user',
        data: { id },
        context: error?.message
      });
      throw error;
    }
  }

  async findByProductId(productId: string): Promise<User[]> {
    try {
      return await this._userRepository.find({
        where: { product: { id: productId } },
        relations: ['product']
      });
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'findByProductId',
        errorMessage: 'Db error while finding users by product id',
        data: { productId },
        context: error?.message
      });
      throw error;
    }
  }

  async findAdminsByProductId(productId: string): Promise<User[]> {
    try {
      return await this._userRepository.find({
        where: {
          product: { id: productId },
          type: 'admin'
        },
        relations: ['product']
      });
    } catch (error) {
      this._logger.error({
        module: 'user',
        class: 'UserRepository',
        method: 'findAdminsByProductId',
        errorMessage: 'Db error while finding admin users by product id',
        data: { productId },
        context: error?.message
      });
      throw error;
    }
  }

  getData(): { message: string } {
    return { message: "pineapple-api" };
  }
}