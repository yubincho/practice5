import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productService.create(createProductDto);
    return newProduct
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return { count: products.length, products }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.productService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.deleteByIdOfProduct(+id);
  }
}
