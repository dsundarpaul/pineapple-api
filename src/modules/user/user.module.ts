import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { UniqueEmailRule } from './constraints/UniqueEmailRule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProduct } from '../products/entities/user-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProduct, Product])
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository,
    User,
    // UniqueEmailRule
  ],
  exports: [UserService]
})
export class UserModule {}
