import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    code: string
        
    @Column()
    description: string
        
    @Column()
    department: string
        
    @Column()
    credits: number

    @ManyToMany((type) => Student, (student) => student.courses)
    students: Student[]

}