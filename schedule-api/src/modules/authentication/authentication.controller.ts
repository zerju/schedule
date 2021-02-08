import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RequestWithUser from './interfaces/request-with-user.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import UserDto, { UserRoles } from '../users/dto/user.dto';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() user: UserDto) {
    user.role = UserRoles.USER;
    return this.authenticationService.register(user);
  }

  @Get('activate')
  async activateUser(@Query('token') token: string): Promise<void> {
    await this.usersService.activateUser(token);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
    );
    const refreshTokenCookie = await this.authenticationService.getCookieWithJwtRefreshToken(
      user.id,
    );

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut(),
    );
    return request.user;
  }
}
