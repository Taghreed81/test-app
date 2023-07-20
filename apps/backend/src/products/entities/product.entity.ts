import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column()
    title: string;
  
    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column({nullable: false})
    price: number;

    @ApiProperty()
    @Column({ nullable: true })
    imageUrl: string;

    @ManyToOne(() => User, (user) => user.products)
    user: User

}
