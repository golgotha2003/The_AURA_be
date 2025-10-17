import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PG_POOL } from './database/database.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const res = await app.get(PG_POOL).query('SELECT current_database();');
    console.log('DB connected:', res.rows[0].current_database);
  }

  const AuthConfig = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('Auth Service API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const AuthDocument = SwaggerModule.createDocument(app, AuthConfig, {
    include: [AuthModule],
  });
  SwaggerModule.setup('swagger/auth', app, AuthDocument);

  const UserConfig = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const UserDocument = SwaggerModule.createDocument(app, UserConfig, {
    include: [UserModule],
  });
  SwaggerModule.setup('swagger/user', app, UserDocument);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
