import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { RedisModule } from 'src/redis/redis.module';
import { OtpModule } from 'src/otp/otp.module';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [JwtModule, RedisModule, OtpModule],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController]
})
export class AuthModule {}
