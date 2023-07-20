import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '@test-app/dtos';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/roles.decorator';
import { JWTAuthGuard } from '../auth/jwt-guard.auth';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/entities/role.enum';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { FileInterceptor} from '@nestjs/platform-express';
// import { storage } from '../file-upload.utils';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {ref, uploadString, getDownloadURL, getStorage} from "firebase/storage";
import multer from 'multer';


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const uploadFile = (fileName: string = 'file'): MethodDecorator => (
  target: any,
  propertyKey,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })(target, propertyKey, descriptor);
};

let fileName ;

// const storage = getStorage(); 
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}



  // @Roles(Role.ADMIN)
  // @UseGuards(JWTAuthGuard, RolesGuard)
//   @Post('/upload')
//   @ApiConsumes('multipart/form-data')
//   // @uploadFile('image')
//   @UseInterceptors(
//     FileInterceptor('image', storage), 
//   )
//  async uploadFile( @Req() req: any, @UploadedFile() file: Express.Multer.File) {
//     if (!file || req.fileValidationError) {
//        throw new BadRequestException('invalid file provided, [image files allowed]');
//      }
//     fileName = file.originalname;
//     return fileName;
    
//     // return await this.productsService.create(fileName,createProductDto, req.user);
//   }



  @Post('add')
  // @UseInterceptors(
  //   FileInterceptor('image', storage))
    async create(@Req() req: any,@Body() createProductDto: CreateProductDto) {
      console.log(req.user)
      // createProductDto.image = file.fieldname;
        return await this.productsService.create( req.user, createProductDto);
  } 

  @Get('all')
  async getProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }

   //get images from  desktop
  //add it to the product when it get create
  // @Get('/home/taghreed/Images')
  // getImage() {

  // }
 

}


