import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Role } from '../../auth/entities/role.enum';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    userName: string

    @ApiProperty()
    @Column({unique: true})
    email: string;
  
    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({type: 'enum', enum: Role,array: true, default: [Role.ADMIN]})
    role: Role[]

    @OneToMany(() => Product, (product) => product.user)
    products: Product[]
    

}


