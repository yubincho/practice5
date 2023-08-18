import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductService {

  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto)
    await this.productRepository.save(newProduct)
    return newProduct
  }

  async findAll() {
    const products = await this.productRepository.find()
    return products
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOneBy({id}) //
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async deleteByIdOfProduct(id: number) {
    await this.productRepository.delete(id)
    return 'deleted'
  }
}
