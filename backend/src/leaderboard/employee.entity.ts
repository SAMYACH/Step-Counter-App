/* eslint-disable prettier/prettier */
import { Teams } from '../leaderboard/teams.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

/**
 * entity employee
 */
@Entity('employee')
export class Employee {
  /*created entity* */
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'Emp_name', type: 'varchar', length: 10 })
  Emp_name: string;
  @Column({ default: 30 })
  age: number;
  @Column({ default: 5 })
  experience: number;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ nullable: false, default: 'software engineer' })
  designation: string;
  @Column({ nullable: false, default: 'hcl' })
  Company_name: string;
  @ManyToOne(() => Teams, (teams) => teams.employee, {
    onDelete: 'CASCADE',
  })
  teams: Teams;
}
