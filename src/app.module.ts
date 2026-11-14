import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as joi from 'joi';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        DATABASE_HOST: joi.required(),
        DATABASE_PORT: joi.required().default(5432),
      })
    }),
    StudentsModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadEntities: true
    }), 
    CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
