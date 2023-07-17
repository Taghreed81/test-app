import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DataSource } from 'typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from '../file-upload.utils'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "taghreed",
      "password": "1234",
      "database": "test",
      autoLoadEntities:true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductsModule,
    MulterModule.register({ storage }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
