import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { AuthGuard } from '../@core/auth/guards/jwt-auth.guard';
import { ClerkAuthGuard } from '../@core/clerk/guards/clerk-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any
  ) {
    console.assert(req.auth.userId, 'User id not found in request');
    return this.productsService.create(createProductDto, req.auth.userId);
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  findAllProductsForThisUser(@Req() req: any) {
    console.assert(req.auth.userId, 'User id not found in request');
    return this.productsService.findAllByUser(req.auth.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
