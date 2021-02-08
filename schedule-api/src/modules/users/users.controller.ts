import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto, { UserRoles } from './dto/user.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { FindOneParams } from '../../utils/types/find-one-params';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../authentication/guards/roles.guard';
import { PaginationParams } from '../../utils/types/pagination-params';
import PaginatedResponseDto from '../../common/shared-dto/paginated-response.dto';

@Controller('users')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  async getAllUsers(
    @Query() { page, size, orderDirection, orderBy }: PaginationParams,
  ): Promise<PaginatedResponseDto> {
    return await this.usersService.getAll(page, size, orderDirection, orderBy);
  }

  @Get(':id')
  async getUserById(@Param() { id }: FindOneParams): Promise<UserDto> {
    return await this.usersService.getById(Number(id));
  }

  @Post('create')
  @Roles(UserRoles.ADMIN)
  async createAdminUser(@Body() user: UserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  async deleteUser(@Param() { id }: FindOneParams): Promise<void> {
    await this.usersService.delete(Number(id));
  }
}
