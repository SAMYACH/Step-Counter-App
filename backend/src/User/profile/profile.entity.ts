/* eslint-disable prettier/prettier */

import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
import { User } from '../user.entity';

/**
 * entity profile
 */
@Entity('profiles')
export class Profile {
  /*created entity* */
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'image_name', type: 'varchar' })
  imageName: string;

  @Column({ type: 'text', name: 'image_content' })
  imageContent: string;
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
