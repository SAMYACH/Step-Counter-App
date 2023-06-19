/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { TeamsController } from './teams.Controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { HttpModule } from '@nestjs/axios';
import { LoggerMiddleware } from '../common/middleware/logger-middleware.middleware';
import { Employee } from './employee.entity';
/**
 * teams module
 */
@Module({
  controllers: [TeamsController],
  //providers:[CatagoriesService],/***standard*
  providers: [
    {
      provide: TeamsService,
      useClass: TeamsService /***class based provider*/,
    },
    TeamsRepository,
  ],
  imports: [HttpModule, TypeOrmModule.forFeature([Teams, Employee])],
  exports: [],
})
export class TeamsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TeamsController);
  }
}
