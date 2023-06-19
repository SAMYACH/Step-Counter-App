import { UserDTO } from './dto/user.dto';
import { Repository } from 'typeorm';
import { HttpStatus, Logger } from '@nestjs/common';
import { Profile } from './profile/profile.entity';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
export declare class UserService {
    private userRepo;
    private profileRepo;
    private jwtService;
    logger: Logger;
    constructor(userRepo: UserRepository, profileRepo: Repository<Profile>, jwtService: JwtService);
    getalluser(): Promise<UserDTO[]>;
    getUserWithProfile(): Promise<UserDTO[]>;
    registerUser(user: UserDTO): Promise<string>;
    login(user: LoginDTO): Promise<{
        token: any;
    }>;
    getbyuserid(id: number): Promise<UserDTO>;
    updateUser(id: number, UserDTO: UserDTO): Promise<{
        response: {
            firstName: string;
            lastName: string;
            emailId: string;
            password: string;
            profile: Profile;
            id: number;
            role: import("./role.enum").Role;
        } & import("./user.entity").User;
        message: string;
        status: HttpStatus;
    }>;
    deleteUser(userid: number): Promise<import("typeorm").DeleteResult>;
    getAllProfile(): Promise<Profile[]>;
}
