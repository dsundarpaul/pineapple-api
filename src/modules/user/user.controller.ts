import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOneById(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Get('product/:productId')
  getUsersByProductId(@Param('productId') productId: string) {
    return this.userService.getUsersByProductId(productId);
  }

  @Get('product/:productId/admins')
  getAdminsByProductId(@Param('productId') productId: string) {
    return this.userService.getAllAdminsByProductId(productId);
  }
}
