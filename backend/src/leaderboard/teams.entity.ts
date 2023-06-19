/* eslint-disable prettier/prettier */
import { Employee } from '../leaderboard/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';
/**entity created for category */
@Entity('teams')
export class Teams {
  /**primary created for category */
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'team_name',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  teamName: string;
  @Column({ name: 'stepCount', default: 1 })
  stepCount: number;
  @Column({ name: 'score', nullable: true })
  score: number;
  @CreateDateColumn()
  createdDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;
  @OneToMany(() => Employee, (employee) => employee.teams, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  employee: Employee[];
}
