import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
