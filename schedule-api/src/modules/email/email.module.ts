import { Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import EmailService from './email.service';

@Module({
  imports: [AppConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
