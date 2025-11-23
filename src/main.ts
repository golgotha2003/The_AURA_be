import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PG_POOL } from './database/database.provider';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('/api');
  
  setupSwagger(app);

  if (process.env.NODE_ENV === 'development') {
    const res = await app.get(PG_POOL).query('SELECT current_database();');
    console.log('DB connected:', res.rows[0].current_database);
  }


  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
