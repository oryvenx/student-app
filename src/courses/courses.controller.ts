import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { PaginationQueryDto } from '../students/dto/pagination-query.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.courseService.findAll(paginationQuery)
    }

    @Get(':code')
    findOne(@Param('code') code: string) {
        return this.courseService.findOne(code)
    }

    @Post()
    create(@Body() body: CreateCourseDto) {
        return this.courseService.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateCourseDto) {
        return this.courseService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.courseService.remove(id)
    }
}
