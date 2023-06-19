import { Controller, Get } from '@nestjs/common';
/**
 * app controller
 */
@Controller()
export class AppController {
  /**
   * construtor
   */
  //constructor(private readonly appService: AppService) {}
  /**
   * provide returns
   * @returns get method
   */
  @Get()
  /**
   * get hello method
   */
  getHello(): string {
    // return this.appService.getHello();
    return 'hello';
  }
}
