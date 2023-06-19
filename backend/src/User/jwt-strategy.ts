/* eslint-disable prettier/prettier */
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      secretOrKey: 'abc',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    try {
      const { emailId } = payload;
      const res = await this.userRepo.findOneByOrFail({ emailId: emailId });
      return res;
    } catch (error: any) {
      throw new UnauthorizedException(error.message);
    }
  }
}
