/* eslint-disable prettier/prettier */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
/**catch httpexception */
@Catch(HttpException)
/** emport catch httpexception */
export class HttpExceptionFilter implements ExceptionFilter {
  /** emport catch httpexception  host*/
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception);
    /** error json format showing*/
    response.status(status).json({
      statusCode: status,
      data: null,
      timestamp: new Date().toISOString(),
      error: exception?.message,
    });
  }
}
