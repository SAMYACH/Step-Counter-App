/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Profile } from '../profile/profile.entity';
/**User object creted */
export class UserDTO {
  /**Api property  first name creted */
  @ApiProperty({
    description: 'user name description',
    required: true,
  })
  /**string object creted */
  @IsString({
    message: 'user must be string',
  })
  /**length object creted */
  @Length(2, 20)
  firstName: string;

  /**for last name */
  @ApiProperty()
  @IsString()
  lastName: string;
  /**email should be strinf */
  @ApiProperty()
  @IsString()
  emailId: string;
  /**Profile should be matched */
  @ApiProperty()
  password: string;
  /**Profile should be matched */
  @ApiProperty()
  profile: Profile;
}
