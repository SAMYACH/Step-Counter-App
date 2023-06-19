/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Employee } from '../employee.entity';
/**entity created */
export class TeamsDTO {
  /**apiproperty used */
  @ApiProperty()
  id: number;
  @ApiProperty()
  teamName: string;
  @ApiProperty()
  stepCount: number;
  @ApiProperty()
  score: number;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  deletedDate: Date;
  @ApiProperty()
  employee: Employee[];
}
