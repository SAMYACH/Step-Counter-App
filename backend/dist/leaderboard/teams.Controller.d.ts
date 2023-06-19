import { TeamsService } from './teams.service';
import { TeamsDTO } from './dto/teams.dto';
export declare class TeamsController {
    private teamsServices;
    constructor(teamsServices: TeamsService);
    listTeams(): Promise<TeamsDTO[]>;
    CreateTeams(teamsDTO: TeamsDTO): Promise<TeamsDTO>;
    getbyTeamsid(id: number): Promise<TeamsDTO>;
    updateTeams(teamsDTO: TeamsDTO, id: number): Promise<TeamsDTO>;
    deleteTeams(id: number): Promise<any>;
    createcounters(teamsDTO: TeamsDTO, id: number): Promise<string>;
}
