import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(@Body() createProductDto: CreateProductDto, user: User): Promise<Product> {
    const newProduct = await this.productsRepository.create(createProductDto);
    newProduct.user = user;
    return await this.productsRepository.save(newProduct); 
   }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productsRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if(!product) throw new NotFoundException('Product not found.');
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: number) {
    return await this.productsRepository.delete({id});
  }
}
