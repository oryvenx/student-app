import { IsInt, IsString, Min } from "class-validator"

export class CreateCourseDto {
    @IsString()
    readonly code: string

    @IsString()
    readonly name: string

    @IsString()
    readonly description: string

    @IsString()
    readonly department: string

    @IsInt()
    @Min(1)
    readonly credits: number
}