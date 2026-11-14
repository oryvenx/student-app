import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../students/entities/course.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationQueryDto } from '../students/dto/pagination-query.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly dataSource: DataSource
    ) {}

    findAll(paginationQueryDto: PaginationQueryDto) {
        const {offset, limit} = paginationQueryDto
        return this.courseRepository.find({
            skip: offset,
            take: limit
        })
    }

    // async findOne(id: string) {
    //     const course = await this.courseRepository.findOne({ 
    //         where: {id: +id }
    //     })

    //     if (!course) {
    //         throw new NotFoundException(`Course with id #${id} does not exist.`)
    //     } 
    //     return course
    // }

    // Find course by Id using the query builder
    async findOne(id: string) {
        const course = await this.courseRepository.createQueryBuilder('course')
        .where('course.id = :id', {id: Number(id)})
        .getOne()

        if (!course) {
            throw new NotFoundException(`Course with id #${id} does not exist`)
        }

        return course
    }

    async create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create({
            ...createCourseDto
        })
        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto
        })

        if (!course) {
            throw new NotFoundException(`Course with id #${id} does not exist`)
        }

        return this.courseRepository.save(course)
    }

    async remove(id: string) {
        const course = await this.findOne(id)
        return this.courseRepository.remove(course)
    }
}
