/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProfileDTO } from './profile/profile.dto';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { HttpExceptionFilter } from 'src/common/exception.filter';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { RolesGuard } from './guards/roles.guards';
import { Roles } from './decorators/roles.decorators';
import { Role } from './role.enum';

/**
 * User Controller responds to inbound HTTP Requests and User HTTP Responses.
 */

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userServices: UserService) {}
  /**
   * for fetch all record from User
   * @returns  list of User
   */
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User Fetched Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'no Data found',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAllUser(): Promise<UserDTO[]> {
    return await this.userServices.getalluser();
  }
  /**
   * for fetch all record user with Profile
   * @returns  list of User with Profile
   */
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'user with Profile Fetched Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'no Data found',
  })
  // @UseFilters(new HttpExceptionFilter())
  // @SetMetadata('roles',['admin','user'])
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/profiles')
  async fetchUsersWithProfile(): Promise<UserDTO[]> {
    return await this.userServices.getUserWithProfile();
  }
  /**
   * for fetch all record from Profile
   * @returns  list of UserProfile
   */
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Profile Fetched Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'no Data found',
  })
  @UseFilters(new HttpExceptionFilter())
  @Get('/allprofiles')
  async fetchAllProfiles(): Promise<ProfileDTO[]> {
    return await this.userServices.getAllProfile();
  }
  /**
   * create new User
   * @param UserDTO specify User name
   * @returns newly created User
   */
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'User Added Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Post('/register')
  async registerUser(@Body() user: UserDTO): Promise<string> {
    return await this.userServices.registerUser(user);
  }
  /**
   * login
   * @param UserDTO specify emailid
   * @returns email with pass return
   */
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Login Sucessfully',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Post('/login')
  async login(@Body() user: LoginDTO): Promise<{ token }> {
    return await this.userServices.login(user);
  }

  /**
   * list User based on id
   * @param id User id
   * @returns User
   */
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'User Fetched Sucessfully for id',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'no Data found for given id',
  })
  @UseFilters(new HttpExceptionFilter())
  @Get(':id')
  async getbyUserid(@Param('id') id: number): Promise<UserDTO> {
    return await this.userServices.getbyuserid(id);
  }
  /**
   * update User based on category
   * @param UserDTO update
   * @param id User id
   * @returns User
   */
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Updated Sucessfully' })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Patch(':id')
  updateUser(@Body() UserDTO: UserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userServices.updateUser(+id, UserDTO);
  }
  /**
   * delete User based on id
   * @param id User id
   * @returns no of effected rows
   */
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Deleted Sucessfully' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'This is a internel server error.try again later ',
  })
  @Delete(':id')
  deleteUser(@Param('id') userid: number) {
    return this.userServices.deleteUser(userid);
  }
}
