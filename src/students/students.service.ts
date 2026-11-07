import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}
    
    private students: Student[] = [
        {
            id: 1,
            name: 'John',
            promotion: 'spring-2026',
            courses: ['JS']
        },   
    ];
    
    findAll() {
        return this.students
    }

    findOne(id: string) {
        const student = this.students.find((student) => student.id === +id)

        if (!student) {
            throw new NotFoundException(`Student with id #${id} does not exist`)
        }
        return student;
    }

    create(createStudentDto: any) {
        this.students.push(createStudentDto);
        return this.students;
    }

    update(id:string, updateStudentDto: any) {
        const existingStudent = this.findOne(id);
        if (existingStudent) {
            //Update
        }
    }

    remove(id: string) {
        const studentIndex  = this.students.findIndex(
            (student) => student.id === +id
        )

        if (studentIndex >= 0) {
            //Given the index of a student, slice 1 element starting from the given index
            this.students.splice(studentIndex, 1);
        }
    }
}
