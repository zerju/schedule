import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import HolidaySchedule from './holiday-schedule.entity';
import ScheduleTime from './schedule-time.entity';

@Entity()
class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @ManyToMany(() => ScheduleTime)
  @JoinTable()
  scheduleTimes: ScheduleTime[];

  @ManyToMany(() => HolidaySchedule)
  @JoinTable()
  holidaySchedules: HolidaySchedule[];

  @VersionColumn()
  ocVersion?: number;

  @Column('timestamp with time zone')
  validFrom: Date;

  @Column('timestamp with time zone')
  validThrough: Date;
}

export default Schedule;
