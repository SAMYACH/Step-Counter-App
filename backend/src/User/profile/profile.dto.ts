/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

/**product object creted */
export class ProfileDTO {
  /**Api object creted */
  @ApiProperty()
  id: number;
  /**Api property creted */
  @ApiProperty()
  /**string object creted */
  /**image name object creted */
  imageName: string;
  /**string object created */
  @ApiProperty()
  imageContent: string;
}
