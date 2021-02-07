import { UserRoles, UserStatus } from '../modules/users/dto/user.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
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
}
