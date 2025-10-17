import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { RedisModule } from 'src/redis/redis.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [UserModule, JwtModule, RedisModule, OtpModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
