import { BadRequestException, Body, Injectable, NotFoundException, Param, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(payload);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserByEmail (email: string): Promise<User> {
    return await this.usersRepository.findOneBy({email});
  }

  async update(id: string, @Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.findOne(req.userId);
    return this.usersRepository.save({...user, ...updateUserDto});
  }

}

