import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/entities/role.enum';
import { User } from '../auth/entities/user.entity';
import { JWTAuthGuard } from '../auth/jwt-guard.auth';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User>{
    console.log(id);
        return await this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Request() req, @Body() updateUserDto: UpdateUserDto) {    
    return this.userService.update(id,req, updateUserDto);
  }


  @UseGuards(JWTAuthGuard)
  @Get(':id/profile')
  getProfile(@Param('id') id: string, @Request() req) {
    return {
      profile: req?.user,
    };
  }

}
