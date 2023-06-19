/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { HttpExceptionFilter } from '../common/exception.filter';
import { TeamsDTO } from './dto/teams.dto';
import { JwtAuthGuard } from '../User/guards/jwt-auth-guard';
import { RolesGuard } from '../User/guards/roles.guards';
import { Role } from '../User/role.enum';
import { Roles } from '../User/decorators/roles.decorators';

/**
 * Controller responds to inbound HTTP Requests and produces HTTP Responses.
 */

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
//@UseInterceptors(ResponseInterceptor)
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private teamsServices: TeamsService) {}
  /**
   *get teams deatils
   * @returns
   */

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Teams Fetched Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No data found',
  })
  @Get()
  async listTeams(): Promise<TeamsDTO[]> {
    console.log('In Controller');
    return await this.teamsServices.fetchAllTeams();
  }

  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Teams Added Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async CreateTeams(
    @Body(new ValidationPipe()) teamsDTO: TeamsDTO,
  ): Promise<TeamsDTO> {
    return await this.teamsServices.addTeams(teamsDTO);
  }
  /**
   * list teams based on id
   * @param id teams id
   * @returns teams
   */
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'teams Fetched Sucessfully for id',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No data found for given id',
  })
  //@UseFilters(new HttpExceptionFilter())
  @Get(':id')
  async getbyTeamsid(@Param('id', ParseIntPipe) id: number): Promise<TeamsDTO> {
    console.log('In controller');
    return await this.teamsServices.getbyTeamsid(id);
  }
  /**
   * update teams based emp
   * @param TeamsDTO update
   * @param id teams id
   * @returns updated
   */
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated Sucessfully' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Put(':id')
  updateTeams(
    @Body() teamsDTO: TeamsDTO,
    @Param('id') id: number,
  ): Promise<TeamsDTO> {
    return this.teamsServices.updateTeams(teamsDTO, id);
  }
  /**
   * delete teams based on id
   * @param id teams id
   * @returns no of effected rows
   */
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Deleted Sucessfully' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'teams Not Found',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  //@Roles(Role.Admin)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteTeams(@Param('id') id: number) {
    return this.teamsServices.deleteTeams(id);
  }
  //requirements

  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'created a new counter Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No data found',
  })
  @Patch(':id')
  async createcounters(
    @Body() teamsDTO: TeamsDTO,
    @Param('id')
    id: number,
  ): Promise<string> {
    console.log(
      'steps can be accumulated for a team of one or multiple employees',
    );
    return await this.teamsServices.createcounters(teamsDTO, id);
  }
}
