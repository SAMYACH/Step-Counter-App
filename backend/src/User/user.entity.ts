/* eslint-disable prettier/prettier */
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile/profile.entity';
import { Role } from './role.enum';
/**entity created for user */
@Entity('users')
export class User {
  /**primary created for user */
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  firstName: string;
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName: string;
  @Column({ name: 'email', type: 'varchar', unique: true })
  emailId: string;
  @Column()
  password: string;
  @Column({ type: 'enum', name: 'role', default: Role.User, enum: Role })
  role: Role;
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;
}
