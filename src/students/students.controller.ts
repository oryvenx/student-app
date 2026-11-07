import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    // private readonly studentService equivalent
    constructor(private readonly studentService: StudentsService) {

    }
    @Get()
    findAll() {
        return this.studentService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.studentService.create(body)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.studentService.update(id, body)
    }

    @Delete(':id') 
    delete(@Param('id') id: string) {
        return this.studentService.remove(id)
    }

}
