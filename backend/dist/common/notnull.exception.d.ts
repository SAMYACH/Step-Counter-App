import { HttpException } from '@nestjs/common';
export declare class NotNullException extends HttpException {
    constructor(message: string);
}