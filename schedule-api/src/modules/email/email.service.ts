import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly appConfigService: AppConfigService) {
    const {
      emailPassword,
      emailService,
      emailUser,
    } = appConfigService.getEmailConfig();
    this.nodemailerTransport = createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
