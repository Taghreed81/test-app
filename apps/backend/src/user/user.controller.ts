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
import { UserService } from './user.service';
import { CreateUserDto } from '@test-app/dtos';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/entities/role.enum';
import { User } from './entities/user.entity';
import { JWTAuthGuard } from '../auth/jwt-guard.auth';
import { RolesGuard } from '../auth/roles.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Get('all')
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User>{
        return await this.userService.findOne(+id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string,@Request() req, @Body() updateUserDto: UpdateUserDto) {    
    return await this.userService.update(id,req, updateUserDto);
  }


  @UseGuards(JWTAuthGuard)
  @Get(':id/profile')
  getProfile(@Param('id') id: string, @Request() req) {
    return {
      profile: req?.user,
    };
  }

}
