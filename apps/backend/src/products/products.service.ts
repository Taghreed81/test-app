import { Body, Injectable, NotFoundException} from '@nestjs/common';
import { CreateProductDto } from '@backend/dtos';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
// import { crudService } from '@backend/crud-service';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
) { }


  async create( file, user: User, @Body() createProductDto: CreateProductDto,): Promise<Product> {
    const newProduct = await this.productsRepository.create(createProductDto);
 console.log(createProductDto, file)
    newProduct.user = user;
    // newProduct.imageUrl = file;
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

  // async addImagesToProduct(file: Express.Multer.File, id: string, email: string) {
    // const product = await this.productsRepository.findOne(productId);

    // if (!product) {
    //   throw new Error('Product not found');
    // }
    // product.images = [...product.images, ...images];
    // return this.productsRepository.save(product);
  // }

}
