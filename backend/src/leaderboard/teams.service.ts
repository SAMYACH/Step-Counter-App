/* eslint-disable prettier/prettier */
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { TeamsRepository } from './teams.repository';
import { Teams } from './teams.entity';
import { TeamsDTO } from './dto/teams.dto';
import { NotNullException } from '../common/notnull.exception';
import { Employee } from './employee.entity';
// import { EmployeeDTO } from './dto/employee.dto';
import { messages } from './teams.constant';

/**
 * Teams service
 */
@Injectable()
export class TeamsService {
  logger = new Logger();
  /**
   * Teams repo
   *condtructor used
   */
  constructor(
    // private teamsRepo: TeamsRepository,
    @InjectRepository(Teams) private teamsRepo: Repository<Teams>,
    @InjectRepository(Employee) private EmployeeRepo: Repository<Employee>,
  ) {
    console.log('In Services');
  }
  /**
   * get teams from db
   * @returns list of teams
   */
  async fetchAllTeams(): Promise<TeamsDTO[]> {
    const res = await this.teamsRepo.find();
    //const res = await this.teamsRepo.find({ relations: ['employee'] });

    if (res.length === 0) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, messages.notFound);
    } else {
      return res;
      //   return await this.teamsRepo.find({select:{teamsName:true}});
    }
  }
  /**
   * create new teams
   * @param teamsDTO create new teams
   * @returns teams id
   */
  async addTeams(teamsDTO: TeamsDTO): Promise<TeamsDTO> {
    /**done exceptional handling */
    try {
      const res = await this.teamsRepo.save(teamsDTO);
      return res;
    } catch (Error: any) {
      console.log(Error);
      if (Error.code === '23505') {
        throw new ConflictException({
          status: HttpStatus.CONFLICT,
          message: 'Teams already exist',
        });
      } else if (Error.code === '23502') {
        throw new NotNullException('Teams name should not be null');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * fetch Teams based on id
   * @param id Teams id
   * @returns Teams
   */
  async getbyTeamsid(id: number): Promise<TeamsDTO> {
    const res = await this.teamsRepo.findOneBy({ id: id });
    if (!res) {
      throw new HttpException(
        'Teams not found for given id',
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
  }
  /**
   * update teams based on id
   * @param teamsDTO database
   * @param id teams id
   * @returns teams
   */
  async updateTeams(teamsDTO: TeamsDTO, id: number): Promise<TeamsDTO> {
    const todo = await this.teamsRepo.findOneOrFail({
      where: { id },
    });
    if (!todo.id) {
      /**provided updation */
      console.error("Todo doesn't exist");
    }
    /**provided updation  by id*/
    await this.teamsRepo.update(id, teamsDTO);
    return await this.teamsRepo.findOne({
      where: { id },
    });
  }
  /**
   *
   * @param id delete teams based on id
   * @returns teams
   */
  async deleteTeams(id: number): Promise<any> {
    const result = await this.teamsRepo.delete({ id: id });

    if (!result) {
      throw new HttpException('Not Teams id found', HttpStatus.NOT_FOUND);
    } else if (result.affected > 0) {
      return result;
    }
  }
  //new re
  async createcounters(teamsDTO: TeamsDTO, id: number) {
    const team = await this.teamsRepo.findOne({
      where: { id: id },
    });
    console.log(team);
    if (team == null) {
      // Creating a new default record
      const res = await this.teamsRepo.save(teamsDTO);
      console.log('Teams step count started', res);
      return `Step Counter: ` + 1 + ``;
    } else {
      // Incrementing the count of visitor by 1
      teamsDTO.stepCount += team.stepCount;
      console.log('Step count ojnnb: ', teamsDTO.stepCount);
      const res = await this.teamsRepo.update(id, teamsDTO);
      console.log('Step count: ', teamsDTO.stepCount);
      // Saving to the database
      return `Step Counter: ` + res + ``;
    }
  }
}
