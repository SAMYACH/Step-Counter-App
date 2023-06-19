import { Employee } from '../leaderboard/employee.entity';
export declare class Teams {
    id: number;
    teamName: string;
    stepCount: number;
    score: number;
    createdDate: Date;
    deletedDate: Date;
    employee: Employee[];
}
