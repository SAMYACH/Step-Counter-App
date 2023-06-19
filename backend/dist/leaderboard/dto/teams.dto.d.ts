import { Employee } from '../employee.entity';
export declare class TeamsDTO {
    id: number;
    teamName: string;
    stepCount: number;
    score: number;
    createdDate: Date;
    deletedDate: Date;
    employee: Employee[];
}
