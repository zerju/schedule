import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
class ScheduleTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfTheWeek: number;

  @Column('time')
  openTime: string;

  @Column('time')
  closeTime: string;

  @Column('timestamp with time zone')
  validFrom: Date;

  @Column('timestamp with time zone')
  validThrough: Date;

  @VersionColumn()
  ocVersion?: number;
}

export default ScheduleTime;
