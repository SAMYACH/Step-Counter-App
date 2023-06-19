import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepo;
    constructor(userRepo: UserRepository);
    validate(payload: JwtPayload): Promise<import("./user.entity").User>;
}
export {};
