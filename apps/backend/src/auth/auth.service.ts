import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from '@backend/dtos';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from '@backend/dtos';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,  private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findUserByEmail(createUserDto.email);
    if(userExists) throw new BadRequestException('You already have an account with that Email.')

    const hashedPassword = await hash(createUserDto.password, 10);
    const payload = { ...createUserDto, password: hashedPassword };
    const createdUser = await this.userService.create(payload);
    return createdUser;
  }

  async login(loginUserDto: loginUserDto) {
    const userExists = await this.userService.findUserByEmail(loginUserDto.email);
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