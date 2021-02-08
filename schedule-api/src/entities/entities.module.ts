import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventLocation from './event-location.entity';
import Event from './event.entity';
import HolidaySchedule from './holiday-schedule.entity';
import ScheduleTime from './schedule-time.entity';
import Schedule from './schedule.entity';
import User from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Event,
      EventLocation,
      HolidaySchedule,
      Schedule,
      ScheduleTime,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
