/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Teams } from './teams.entity';
import { TeamsDTO } from './dto/teams.dto';
@Injectable()
export class TeamsRepository extends Repository<Teams> {
  constructor(private dataSource: DataSource) {
    super(Teams, dataSource.createEntityManager());
  }
  async categoryDetail(): Promise<TeamsDTO[]> {
    return await this.query('select id, teams_name from public.teams');
  }
}
