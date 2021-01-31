import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IVersionCheckEntity } from 'src/utils/crud-helper';

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVATED = 'ACTIVATED',
  DEACTIVATED = 'DEACTIVATED',
  BANNED = 'BANNED',
}

export default class UserDto implements IVersionCheckEntity {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  email?: string;

  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsString()
  @ApiProperty()
  password?: string;

  @IsEnum(UserRoles)
  @ApiProperty()
  role?: UserRoles;

  @IsEnum(UserStatus)
  @ApiProperty()
  status?: UserStatus;

  @IsString()
  @ApiProperty()
  phoneNumber?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Optimistic concurrency check' })
  ocVersion?: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
