import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'title can not be Empty.' })
    @IsString({ message: 'title should be a string' })
    title!: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'description can not be Empty.' })
    @IsString({ message: 'title should be a string' })
    description!: string;

    @ApiProperty()
    @IsNumber()
    price!: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Image can not be Empty.' })
    @IsString({ message: 'Image should be in string format.' })
    imageUrl!: string;

}
