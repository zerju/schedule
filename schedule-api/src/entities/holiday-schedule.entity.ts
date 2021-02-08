import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
class HolidaySchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

  @Column('time')
  openTime: string;

  @Column('time')
  closeTime: string;

  @VersionColumn()
  ocVersion?: number;
}

export default HolidaySchedule;
