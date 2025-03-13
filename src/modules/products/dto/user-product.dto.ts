// src/products/dto/user-product.dto.ts
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user-product.entity';

export class UserProductDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}