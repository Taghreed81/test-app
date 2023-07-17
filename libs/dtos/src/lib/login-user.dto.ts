import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class loginUserDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Email can not be Empty.'})
    @IsEmail({}, {message:'Please provide a valid email.'})
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(5, { message: 'Password minmum characters should be 5.' })
    password!: string;
}