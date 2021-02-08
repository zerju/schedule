import { UsersService } from '../../modules/users/users.service';
import * as bcrypt from 'bcrypt';
import UserDto from '../../modules/users/dto/user.dto';
import { PostgresErrorCode } from '../../common/database/postgresErrorCodes.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './interfaces/token-payload.interface';
import User from '../../entities/user.entity';
import * as crypto from 'crypto';
import EmailService from '../email/email.service';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const activationToken = crypto
      .createHash('sha256')
      .update(Date.now().toString())
      .digest('hex');
    // 2h
    const activationTokenExpiration = new Date(Date.now() + 2 * 3600 * 1000);
    try {
      const createdUser = await this.usersService.create({
        ...userDto,
        password: hashedPassword,
        activationToken,
        activationTokenExpiration,
      });
      const { appName, publicUrl } = this.configService.getServerConfig();
      const link = `${publicUrl}/auth/activate?token=${activationToken}`;
      const emailOptions: Mail.Options = {
        to: createdUser.email,
        subject: `${appName} - Account Activation`,
        html: `
        <h2>Registration completed</h2>
        </ br>
        <p>Click on <a href=${link}>this link</a> to activate your account. <b>The link will expire in 2 hours</b>.</p>
        </ br>
        </ br>
        <p>Sincerely,</p>
        </ br>
        <p>${appName} Team</p>
        `,
      };
      await this.emailService.sendMail(emailOptions);
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${
      this.configService.getServerConfig().jwtExpirationTime
    }`;
  }

  async getCookieWithJwtRefreshToken(
    userId: number,
    saveToDb = true,
  ): Promise<string> {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.getServerConfig().jwtRefreshTokenSecret,
      expiresIn: `${
        this.configService.getServerConfig().jwtRefreshTokenExpirationTime
      }s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${
      this.configService.getServerConfig().jwtRefreshTokenExpirationTime
    }`;
    if (saveToDb) {
      await this.usersService.setCurrentRefreshToken(token, userId);
    }
    return cookie;
  }

  public getCookiesForLogOut(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
