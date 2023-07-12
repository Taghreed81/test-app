import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findUserByEmail(createUserDto.email);
    if(userExists) throw new BadRequestException('You already have an acount with that Email.')

    const hashedPassword = await hash(createUserDto.password, 10);
    const payload = { ...createUserDto, password: hashedPassword };
    const createdUser = await this.usersService.create(payload);
    return createdUser;
  }

  async login(loginUserDto: loginUserDto) {
    const userExists = await this.usersService.findUserByEmail(loginUserDto.email);
    if(!userExists) throw new HttpException('NOT_FOUND', 404);

    const isPasswordValid = await compare(loginUserDto.password, userExists.password);
    if (!isPasswordValid) throw new HttpException('INVALID_PASSWORD', 403);

    const payload = { 
      id: userExists.id,
      email: userExists.email,
      userName: userExists.userName,
      role: userExists.role
      };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token
        };
  }

}