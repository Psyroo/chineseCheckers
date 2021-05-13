import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    wins: number;

    @Column()
    loses: number;

    @Column()
    winstreak: number;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

}