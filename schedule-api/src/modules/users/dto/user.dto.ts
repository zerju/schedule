import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IVersionCheckEntity } from '../../../utils/crud-helper';

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
  @IsEmail()
  email?: string;

  @IsString()
  @ApiProperty()
  firstName?: string;

  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsString()
  @ApiProperty()
  @MinLength(8)
  password?: string;

  @IsEnum(UserRoles)
  @ApiProperty()
  @IsOptional()
  role?: UserRoles;

  @IsEnum(UserStatus)
  @ApiProperty()
  @IsOptional()
  status?: UserStatus;

  @IsString()
  @ApiProperty()
  @IsOptional()
  phoneNumber?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Optimistic concurrency check' })
  ocVersion?: number;

  @IsDateString()
  @IsOptional()
  createdAt?: string;

  @IsDateString()
  @IsOptional()
  updatedAt?: string;
}
