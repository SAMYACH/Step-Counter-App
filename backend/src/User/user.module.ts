/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile/profile.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt-strategy';
/**
 * method to export modules
 */
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'abc',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    TypeOrmModule.forFeature([User, Profile]),
  ],
  exports: [],
})
/**
 * user modules
 */
export class UserModule {}
