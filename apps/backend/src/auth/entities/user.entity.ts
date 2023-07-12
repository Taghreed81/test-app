import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

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

    @Column({type: 'enum', enum: Role,array: true, default: [Role.ADMIN]})
    role: Role[]

}


