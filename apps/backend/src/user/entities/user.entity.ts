import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column()
    username: string

    @Column()
    email: string;
  
    @Column()
    password: string;

    // @Column({ default: true })
    // isActive: boolean;

}

