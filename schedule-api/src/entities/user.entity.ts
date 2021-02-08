import { UserRoles, UserStatus } from '../modules/users/dto/user.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Event from './event.entity';

@Entity({ name: 'registered_user' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: UserRoles;

  @Column()
  status: UserStatus;

  @Column({ nullable: true })
  phoneNumber?: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @VersionColumn()
  ocVersion?: number;

  @OneToMany(() => Event, (event: Event) => event.createdBy)
  events: Event;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  activationToken?: string;

  @Column('timestamp with time zone', { nullable: true })
  activationTokenExpiration?: Date;
}

export default User;
