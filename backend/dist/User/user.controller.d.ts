import { HttpStatus } from '@nestjs/common';
import { ProfileDTO } from './profile/profile.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { Role } from './role.enum';
export declare class UserController {
    private userServices;
    constructor(userServices: UserService);
    fetchAllUser(): Promise<UserDTO[]>;
    fetchUsersWithProfile(): Promise<UserDTO[]>;
    fetchAllProfiles(): Promise<ProfileDTO[]>;
    registerUser(user: UserDTO): Promise<string>;
    login(user: LoginDTO): Promise<{
        token: any;
    }>;
    getbyUserid(id: number): Promise<UserDTO>;
    updateUser(UserDTO: UserDTO, id: number): Promise<{
        response: {
            firstName: string;
            lastName: string;
            emailId: string;
            password: string;
            profile: import("./profile/profile.entity").Profile;
            id: number;
            role: Role;
        } & import("./user.entity").User;
        message: string;
        status: HttpStatus;
    }>;
    deleteUser(userid: number): Promise<import("typeorm").DeleteResult>;
}
