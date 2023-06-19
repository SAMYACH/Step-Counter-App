import { Injectable, OnModuleInit } from '@nestjs/common';
/**
 * Decorator that marks a class as a provider. Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system.
 */
@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('AppService OnModuleInit');
  }
  /**
   * to get method
   * @returns  get method
   */
  getHello(): string {
    return 'Good Morning';
  }
}
//s
