import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export default class PaginatedResponseDtoDto {
  @IsArray()
  @ApiProperty()
  items: any[];

  @IsNumber()
  @ApiProperty()
  numOfAllItems: number;
}
