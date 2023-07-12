import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Role } from '../../auth/entities/role.enum';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string

    @Column({unique: true})
    email: string;
  
    @Column()
    password: string;

    @Column({type: 'enum', enum: Role,array: true, default: [Role.CONSUMER]})
    role: Role[]

    @OneToMany(() => Product, (product) => product.user)
    products: Product[]

}


