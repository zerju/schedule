import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppConfigService } from '../../modules/app-config/app-config.service';
import { AppConfigModule } from '../../modules/app-config/app-config.module';

export function databaseModuleFactory(): DynamicModule {
  return TypeOrmModule.forRootAsync({
    imports: [AppConfigModule],
    inject: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
      const dbConfig = appConfigService.getDbConfig();

      return {
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        ssl: dbConfig.ssl,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        autoLoadEntities: true,
        synchronize: dbConfig.synchronizeSchema,
        dropSchema: dbConfig.dropSchema,
        logging: dbConfig.logSQL,
        namingStrategy: new SnakeNamingStrategy(),
      };
    },
  });
}
