import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '@backend/dtos';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
