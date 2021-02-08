import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ServerConfig } from './server.config';
import { PostgresConfig } from './postgres.config';
import { EmailConfig } from './email.config';

@Injectable()
export class AppConfigService {
  env: NodeJS.ProcessEnv;

  constructor() {
    let envFilePath: string;

    if (process.env.API_ENVIRONMENT === 'production') {
      envFilePath = '.env';
    } else {
      envFilePath = `.env.${process.env.API_ENVIRONMENT}`;
    }

    if (fs.existsSync(envFilePath)) {
      dotenv.config({ path: path.resolve(process.cwd(), envFilePath) });
    }

    this.env = process.env;
  }

  getEvironment() {
    return this.env.API_ENVIRONMENT;
  }

  getServerConfig(): ServerConfig {
    return {
      appName: this.getString('APP_NAME', undefined, true),
      publicUrl: this.getString('PUBLIC_URL', undefined, true),
      port: this.getInt('PORT', undefined, true),
      jwtSecret: this.getString('JWT_SECRET', undefined, true),
      jwtExpirationTime: this.getInt('JWT_EXPIRATION_TIME', undefined, true),
      jwtRefreshTokenSecret: this.getString(
        'JWT_REFRESH_TOKEN_SECRET',
        undefined,
        true,
      ),
      jwtRefreshTokenExpirationTime: this.getString(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        undefined,
        true,
      ),
    };
  }

  getEmailConfig(): EmailConfig {
    return {
      emailService: this.getString('EMAIL_SERVICE', undefined, true),
      emailUser: this.getString('EMAIL_USER', undefined, true),
      emailPassword: this.getString('EMAIL_PASSWORD', undefined, true),
    };
  }

  getDbConfig(): PostgresConfig {
    return {
      user: this.getString('POSTGRES_USER', undefined, true),
      password: this.getString('POSTGRES_PASSWORD', undefined, true),
      database: this.getString('POSTGRES_DB', undefined, true),
      host: this.getString('POSTGRES_HOST', undefined, true),
      port: this.getInt('POSTGRES_PORT', undefined, true),
      ssl: this.getBoolean('POSTGRES_SSL', false),
      synchronizeSchema: this.getBoolean('SYNCHONIZE_DB_SCHEMA', false),
      dropSchema: this.getBoolean('DROP_DB_SCHEMA', true),
      logSQL: this.getBoolean('LOG_SQL', false),
    };
  }

  private getString(
    key: string,
    defaultValue?: string,
    required = false,
  ): string | undefined {
    if (this.env[key]) {
      return this.env[key];
    }
    if (required) {
      throw Error(`Missing required environment setting ${key}.`);
    }
    return defaultValue;
  }

  private getBoolean(
    key: string,
    defaultValue?: boolean,
    required = false,
  ): boolean {
    const value = this.getString(key, undefined, required);
    if (typeof value === 'undefined' || value === null || value.trim() === '') {
      return defaultValue;
    }
    if (value.trim().toLowerCase() === 'false') {
      return false;
    }
    if (value.trim().toLowerCase() === 'true') {
      return true;
    }
  }

  private getInt(key: string, defaultValue?: number, required = false): number {
    const value = this.getString(key, undefined, required);
    if (typeof value === 'undefined' || value === null || value.trim() === '') {
      return defaultValue;
    }
    try {
      return parseInt(value, 10);
    } catch (err) {
      throw new Error(`Error parsing value ${value} to intiger.`);
    }
  }
}
