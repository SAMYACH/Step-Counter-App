/* eslint-disable prettier/prettier */

import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { data } from 'jquery';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataSource } from 'typeorm';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //console.log(context);
    let statusCode = context.switchToHttp().getResponse().statusCode;
    let response = next.handle().pipe(
      map((data) => {
        return {
          data: data,
          statusCode: statusCode,
          errormessage: null,
        };
      }),
    );
    return response;
  }
}
