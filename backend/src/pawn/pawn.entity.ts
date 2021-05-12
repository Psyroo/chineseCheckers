import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pawn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team: number;

    @Column("point")
    position: {x: number, y: number};
}