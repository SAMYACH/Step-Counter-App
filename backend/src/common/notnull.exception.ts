/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * imported not null filter
 */
export class NotNullException extends HttpException {
  /**
   * imported not null filter custroter
   */
  constructor(message: string) {
    super(message, 705);
  }
}
