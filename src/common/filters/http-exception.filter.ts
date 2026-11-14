import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { timestamp } from 'rxjs';

@Catch()
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('status', status)
    console.log("exceptionResponse", exceptionResponse)

    const error = 
      typeof response == 'string'
      ? {message: exceptionResponse}
      : (exceptionResponse as Object)

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    })
  }
}
