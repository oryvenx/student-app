import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly dataSource: DataSource,
    ) {}
    
    findAll(paginationQueryDto: PaginationQueryDto) {
        const {offset, limit} = paginationQueryDto
        return this.studentRepository.find({
            relations: {
                courses: true,
            },
            skip: offset,
            take: limit
        })
    }

    async findOne(id: string) {
        const student = await this.studentRepository.findOne({
            where: { id: +id },
        })

        if (!student) {
            throw new NotFoundException(`Student with id #${id} does not exist`)
        }
        return student;
        //return this.studentRepository.findOne
    }

    async create(createStudentDto: CreateStudentDto) {
        const courses = await Promise.all(
            createStudentDto.courses.map((code) => this.preloadCourses(code))
        )
        const student = this.studentRepository.create({
            ...createStudentDto,
            courses,
        })
        return this.studentRepository.save(student)
    }

    async update(id:string, updateStudentDto: UpdateStudentDto) {
        const courses = updateStudentDto.courses && 
        (await Promise.all(
            updateStudentDto.courses.map((code) => this.preloadCourses(code))
        ));

        const student = await this.studentRepository.preload({
            id: +id,
            ...updateStudentDto,
            courses
        });

        if(!student) {
            throw new NotFoundException(`Student #${id} not found`)
        }
        return this.studentRepository.save(student)
    }

    async remove(id: string) {
        const student = await this.findOne(id);
        return this.studentRepository.remove(student);
    }

    private async preloadCourses(code: string) {
        const course = await this.courseRepository.findOneBy({ code })

        if (!course) {
            throw new NotFoundException(`Coure with code ${code} does not exist`)
        }

        return course
    }

    async recommendStudent(student: Student) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            student.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_event';
            recommendEvent.type = 'student';
            recommendEvent.payload = {studentId: student.id};

            await queryRunner.manager.save(student);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}

//Replace create student with a transaction using the query builder
