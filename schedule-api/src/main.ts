import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { usage } from './utils/usage';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/app-config/app-config.service';
import { ExcludeNullInterceptor } from './common/interceptors/exclude-null.interceptor';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });
  app.use(cookieParser());
  const configService = app.get(AppConfigService);
  const serverConfig = configService.getServerConfig();

  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    maxAge: 3600,
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    },
  });

  // setup swagger
  const options = new DocumentBuilder()
    .setTitle('Schedule API')
    .setDescription('Schedule API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // log memory usage
  setInterval(
    () => logger.log('Memory Usage', JSON.stringify(usage())),
    1000 * 60 * 15,
  );

  const host = '0.0.0.0';
  await app.listen(serverConfig.port, host);
  logger.log(`Application started @ ${host}:${serverConfig.port}`);
}
bootstrap();
