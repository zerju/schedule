import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './dto/user.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';
import { FindOneParams } from '../../utils/find-one-params';

@Controller('users')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getUserById(@Param() { id }: FindOneParams) {
    return this.usersService.getById(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateUser(@Param() { id }: FindOneParams, @Body() user: UserDto) {
    return this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteUser(@Param() { id }: FindOneParams) {
    this.usersService.delete(Number(id));
  }
}
