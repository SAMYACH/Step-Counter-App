/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Teams } from '../teams.entity';
export class EmployeeDTO {
  @ApiProperty()
  id: number;
  /**Api property creted */
  @ApiProperty({
    description: 'Employee name description',
    required: true,
  })
  Emp_name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  experience: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  designation: string;
  @ApiProperty()
  Company_name: string;
  @ApiProperty()
  teams: Teams;
}
