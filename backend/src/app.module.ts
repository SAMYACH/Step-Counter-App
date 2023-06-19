import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TeamsModule } from './leaderboard/teams.module';

/**
 * main module to start your application
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'priya123',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      schema: 'public',
    }),
    TeamsModule,
    // ProductsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
/**
 * app module
 */
export class AppModule {}
