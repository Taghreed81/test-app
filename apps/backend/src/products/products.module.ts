import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  exports: [TypeOrmModule, ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService],
})
export class ProductsModule {}
