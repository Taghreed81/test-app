import { IsArray, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message: 'title can not be Empty.'})
    @IsString({message: 'title should be a string'})
    title: string;

    @IsNotEmpty({message: 'description can not be Empty.'})
    @IsString({message: 'title should be a string'})
    description: string;

    @IsNumber()
    price: number

    @IsNotEmpty({message: 'Image can not be Empty.'})
    @IsArray({message: 'Image can should be in array format.'})
    images: string[]

}
