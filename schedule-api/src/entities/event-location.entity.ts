import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export enum EventLocationStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

@Entity()
class EventLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationName: string;

  @Column()
  status: EventLocationStatus;

  @VersionColumn()
  ocVersion?: number;
}

export default EventLocation;
