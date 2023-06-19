import { Profile } from './profile/profile.entity';
import { Role } from './role.enum';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    role: Role;
    profile: Profile;
}
