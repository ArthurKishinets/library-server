import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column()
    filename: string;

    @Column('int')
    Comments: String[];

    @Column()
    isPublished: boolean;

    @Column()
    date: Date;
}