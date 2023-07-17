import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@backend/dtos';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
