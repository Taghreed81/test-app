import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '@test-app/dtos';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
