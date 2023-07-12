import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
  
    @Column()
    description: string;

    @Column()
    price: number;

    @Column('simple-array')
    images: string[]

    @ManyToOne(() => User, (user) => user.products)
    user: User
}
