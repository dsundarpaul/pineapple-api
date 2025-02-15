import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // private readonly _logger: LoggerService
    private readonly _userRepository: UserRepository
  ) {}

  private readonly logger = new Logger(UserService.name);

  async createUser(createUserDto: CreateUserDto) {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'createUser',
      info: 'User creation started',
      // data: createUserDto
    });

    const createdUser = await this._userRepository.createUser(createUserDto);

    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'createUser',
      info: 'User creation completed',
      data: createdUser
    });
    
    return createdUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'update',
      info: 'Updating user',
      data: { id, updateUserDto }
    });

    const existingUser = await this.findOne(id);

    const updatedUser = await this._userRepository.update(id, updateUserDto);

    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'update',
      info: 'User updated successfully',
      data: updatedUser
    });

    return updatedUser;
  }

  async deleteUserById(id: string) {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'delete',
      info: 'Deleting user',
      data: { id }
    });

    await this.findOne(id); // Verify user exists
    await this._userRepository.remove(id);

    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'delete',
      info: 'User deleted successfully',
      data: { id }
    });
  }

  async getUsersByProductId(productId: string): Promise<User[]> {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'getUsersByProductId',
      info: 'Getting users by product id',
      data: { productId }
    });

    const users = await this._userRepository.findByProductId(productId);

    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'getUsersByProductId',
      info: 'Retrieved users by product id',
      data: { productId, count: users.length }
    });

    return users;
  }

  async getAllAdminsByProductId(productId: string): Promise<User[]> {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'getAllAdminsByProductId',
      info: 'Getting admin users by product id',
      data: { productId }
    });

    const admins = await this._userRepository.findAdminsByProductId(productId);

    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'getAllAdminsByProductId',
      info: 'Retrieved admin users by product id',
      data: { productId, count: admins.length }
    });

    return admins;
  }

  async findOne(id: string) {
    this.logger.log({
      module: 'user',
      class: 'UserService',
      method: 'findOne',
      info: 'Finding user by id',
      data: { id }
    });

    const user = await this._userRepository.findOne(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }
}
