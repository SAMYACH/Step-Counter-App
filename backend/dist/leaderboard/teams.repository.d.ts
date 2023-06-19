import { DataSource, Repository } from 'typeorm';
import { Teams } from './teams.entity';
import { TeamsDTO } from './dto/teams.dto';
export declare class TeamsRepository extends Repository<Teams> {
    private dataSource;
    constructor(dataSource: DataSource);
    categoryDetail(): Promise<TeamsDTO[]>;
}
