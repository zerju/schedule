import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import EventLocation from './event-location.entity';
import User from './user.entity';

@Entity()
class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp with time zone')
  fromDateTime: Date;

  @Column('timestamp with time zone')
  toDateTime: Date;

  @Column()
  isPublic: boolean;

  @Column()
  eventName: boolean;

  @Column()
  eventDescription: string;

  @ManyToOne(() => User, (createdBy: User) => createdBy.events)
  createdBy: User;

  @OneToOne(() => EventLocation)
  @JoinColumn()
  eventLocation: EventLocation;

  @VersionColumn()
  ocVersion?: number;
}

export default Event;
