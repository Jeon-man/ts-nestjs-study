import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import Case from 'case';
import { Handler } from 'express';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from '@module';
import { ConfigService } from '@service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  const NODE_ENV = configService.get('NODE_ENV');

  app.set('trust proxy', true);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: NODE_ENV !== 'production',
      transform: true,
    }),
  );

  // initialize global middleware
  app.use(helmet());

  // set dev specific things
  if (NODE_ENV === 'development') {
    // disable upgrade-insecure-requests for dev environment
    // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
    app.use(<Handler>((req, res, next) => {
      const csp = res.getHeader('Content-Security-Policy');
      if (csp)
        res.setHeader(
          'Content-Security-Policy',
          csp.toString().replace(/;?upgrade-insecure-requests;?/g, ''),
        );
      return next();
    }));

    // initialize swagger
    const config = new DocumentBuilder()
      .setTitle(Case.title(configService.get('APP_NAME')))
      .setDescription(`The ${configService.get('APP_NAME')} API description`)
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('User', '유저 REST APIs ')
      .addTag('Auth', '로그인 로그아웃 등 Authentication 관련 APIs ')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(configService.get('PORT'));
}

bootstrap();
