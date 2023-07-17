import { IsNotEmpty, IsString, Length } from "class-validator";
import { loginUserDto } from "./login-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends loginUserDto {
     @ApiProperty()
     @Length(3, 10)
     @IsNotEmpty({message: 'Name can not be null.'})
     @IsString()
     userName!: string;
}
