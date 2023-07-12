import { IsNotEmpty, IsString, Length } from "class-validator";
import { loginUserDto } from "../../auth/dto/login-user.dto";

export class CreateUserDto extends loginUserDto {
     @Length(3, 10)
     @IsNotEmpty({message: 'Name can not be null.'})
     @IsString()
     userName: string;
}
