import { MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { categoriesModule } from './catagories/categories.module';
import { LoggerMiddleware } from './common/middleware/logger-middleware.middleware';
import { ProductsModule } from './products/products.module';
import { UserModule } from './User/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {ScheduleModule} from '@nestjs/schedule';

/**
 * main module to start your application
 */
@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'priya123',
      database: 'postgres',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      schema: 'public'
    }
  ),categoriesModule, ProductsModule,UserModule,
  EventEmitterModule.forRoot(),
  ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  
})
/**
 * app module
 */
export class AppModule{
  
}
  

