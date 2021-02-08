import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../entities/user.entity';
import { AppConfigService } from '../app-config/app-config.service';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const mockedConfigService = {
  getServerConfig(): any {
    return {
      port: 5000,
      jwtSecret: 'secret',
      jwtExpirationTime: 3600,
    };
  },
  getDbConfig(): any {
    return {
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      host: 'localhost',
      port: 5342,
      ssl: false,
      synchronizeSchema: true,
      dropSchema: false,
      logSQL: false,
    };
  },
};

const mockedJwtService = {
  sign: () => '',
};

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: AppConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      imports: [],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof service.getCookieWithJwtToken(userId)).toEqual('string');
    });
  });
});
