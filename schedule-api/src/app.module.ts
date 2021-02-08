import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { databaseModuleFactory } from './common/database/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exception-logger';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    UsersModule,
    AppConfigModule,
    databaseModuleFactory(),
    AuthenticationModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
