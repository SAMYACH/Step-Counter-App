/* eslint-disable prettier/prettier */
import { UserDTO } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Profile } from './profile/profile.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

/**
 * User service
 */
@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(
    private userRepo: UserRepository,
    //@InjectRepository(User) private UserRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private jwtService: JwtService,
  ) {}
  /**
   * get User from db
   * @returns list of User
   */
  async getalluser(): Promise<UserDTO[]> {
    const res = await this.userRepo.find();
    if (res.length === 0) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'No Data found',
      });
    }
    return res;
  }
  /**
   * get User from db
   * @returns list of User
   */
  //async getUserWithProfile(): Promise<UserDTO[]> {
  //  return await this.UserRepo.find({relations:['profile']});

  //}
  /**
   * get User from db
   * @returns list of User
   */
  async getUserWithProfile(): Promise<UserDTO[]> {
    return await this.userRepo.find();
  }

  /**
   * create new user
   * @param UserDTO create new user
   * @returns user id
   */
  async registerUser(user: UserDTO): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      console.log(salt);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      console.log('hashedPassword....', hashedPassword);
      user.password = hashedPassword;
      const res = await this.userRepo.save(user);
      if (res?.id) {
        const msg = `User registered sucessfully with id: ${res.id}`;
        this.logger.log(msg);
        return msg;
      } else {
        const msg = 'Something went wrong,try again after sometime';
        this.logger.error(msg);
        throw new InternalServerErrorException(msg);
      }
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
    //return await this.UserRepo.save({...user,password:hashedPassword})
  }

  /**
   * login user
   * @param user with email with password
   * @returns
   */
  async login(user: LoginDTO): Promise<{ token: any }> {
    try {
      const userDetail = await this.userRepo.findOneByOrFail({
        emailId: user.emailId,
      });

      if (
        userDetail &&
        (await bcrypt.compare(user.password, userDetail.password))
      ) {
        const jwtPayload: JwtPayload = { emailId: userDetail.emailId };
        const token = await this.jwtService.sign(jwtPayload);

        return { token };
        // return "sucess"
      } else {
        const msg = 'Invalid credential';
        this.logger.warn(msg);
        throw new UnauthorizedException(msg);
      }
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
  /**
   * fetch User based on id
   * @param id User id
   * @returns User
   */
  async getbyuserid(id: number): Promise<UserDTO> {
    const res = await this.userRepo.findOneBy({ id: id });
    if (!res) {
      throw new HttpException(
        'User not found for given id',
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
  }
  /**
   * update User
   * @param UserDTO  User id database
   * @param id id
   * @returns User is returns
   */
  async updateUser(id: number, UserDTO: UserDTO) {
    const findData = await this.userRepo.findOne({ where: { id } });
    if (!findData)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const updateRes = await this.userRepo.save({ ...findData, ...UserDTO });
    if (!updateRes)
      throw new HttpException(
        'Something went wrong.try again',
        HttpStatus.BAD_REQUEST,
      );
    return {
      response: updateRes,
      message: 'User updated sucessfully',
      status: HttpStatus.OK,
    };
  }

  /**
   *
   * @param id delete User based on id
   * @returns User
   */
  async deleteUser(userid: number) {
    const userProfile = await this.userRepo.findOneBy({ id: userid });
    const res = await this.profileRepo.delete(userProfile.profile.id);
    if (res.affected === 0) {
      throw new HttpException(
        'User not found for delete for given id',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return res;
    }
  }
  /**
   * get User from db
   * @returns list of User
   */
  async getAllProfile() {
    return await this.profileRepo.find();
  }
}
