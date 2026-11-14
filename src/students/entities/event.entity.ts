import { Column, Index, PrimaryGeneratedColumn, Entity } from "typeorm";

@Index(['name', 'type'])
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    type: string;

    @Index()
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>
}