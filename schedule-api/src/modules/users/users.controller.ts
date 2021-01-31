import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './dto/user.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateUser(@Param('id') id: string, @Body() user: UserDto) {
    return this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteUser(@Param('id') id: string) {
    this.usersService.delete(Number(id));
  }
}
