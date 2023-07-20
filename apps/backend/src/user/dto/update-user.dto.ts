import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@test-app/dtos';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
