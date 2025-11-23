import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { DatabaseModule } from './database/database.module';
import { BranchModule } from './branch/branch.module';
import { FloorModule } from './floor/floor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    JwtModule,
    RedisModule,
    EmailModule,
    BranchModule,
    FloorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
