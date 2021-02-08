import { IsNumber, Min, IsOptional, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum PageOrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size?: number;

  @IsOptional()
  @IsEnum(PageOrderType)
  orderDirection?: PageOrderType;

  @IsOptional()
  @Type(() => String)
  @IsString()
  orderBy?: string;
}
