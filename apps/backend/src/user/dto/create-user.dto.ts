import { Transform } from "class-transformer";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {

     @IsString()
     @Length(4, 10)
     firstName: string;

     @IsString()
     @Length(4, 10)
     lastName: string;

     @IsString()
     userName: string;

     @IsEmail()
     email: string;

     @IsString()
     @MinLength(8, { message: 'Password must be at least 8 characters long' })
     @Transform(({ value }) => value.trim()) // Optional: Trim whitespace from the input
     password: string;
}
