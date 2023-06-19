import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Teams } from './teams.entity';
import { TeamsDTO } from './dto/teams.dto';
import { Employee } from './employee.entity';
export declare class TeamsService {
    private teamsRepo;
    private EmployeeRepo;
    logger: Logger;
    constructor(teamsRepo: Repository<Teams>, EmployeeRepo: Repository<Employee>);
    fetchAllTeams(): Promise<TeamsDTO[]>;
    addTeams(teamsDTO: TeamsDTO): Promise<TeamsDTO>;
    getbyTeamsid(id: number): Promise<TeamsDTO>;
    updateTeams(teamsDTO: TeamsDTO, id: number): Promise<TeamsDTO>;
    deleteTeams(id: number): Promise<any>;
    createcounters(teamsDTO: TeamsDTO, id: number): Promise<string>;
}
